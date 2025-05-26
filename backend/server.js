/* global process */
// Import required modules
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcryptjs';
import { validateStartup, validateInvestor } from './middleware/validation.js';
import { authenticateToken, generateToken } from './middleware/auth.js';
import { findMatches, saveMatch } from './services/matchingService.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Environment variables with defaults
const env = process.env;
const CORS_ORIGIN = env.CORS_ORIGIN || 'http://localhost:3000';
const DB_HOST = env.DB_HOST || 'localhost';
const DB_USER = env.DB_USER || 'root';
const DB_PASSWORD = env.DB_PASSWORD || 'root';
const DB_NAME = env.DB_NAME || 'pitchmatch';
const PORT = env.PORT || 5001;

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    
    // Check if user already exists
    const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Create user
      const [userResult] = await connection.query(
        'INSERT INTO users (email, password_hash, user_type) VALUES (?, ?, ?)',
        [email, hashedPassword, userType]
      );
      
      const userId = userResult.insertId;
      let profileResult;

      // Create profile based on user type
      if (userType === 'startup') {
        [profileResult] = await connection.query(
          'INSERT INTO startups (user_id, name, description, industry, stage, location) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, 'New Startup', 'Please update your profile', 'Technology', 'Early', 'Location']
        );
      } else if (userType === 'investor') {
        [profileResult] = await connection.query(
          'INSERT INTO investors (user_id, name, bio, investment_focus, preferred_stages, preferred_industries) VALUES (?, ?, ?, ?, ?, ?)',
          [userId, 'New Investor', 'Please update your profile', 'Technology', 'Early', 'Technology']
        );
      }

      await connection.commit();
      
      const token = generateToken({ 
        id: userId, 
        email, 
        userType,
        profileId: profileResult.insertId 
      });
      
      res.status(201).json({ 
        token,
        user: {
          id: userId,
          email,
          userType,
          profileId: profileResult.insertId
        }
      });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Protected Routes
app.use('/api/startups', authenticateToken);
app.use('/api/investors', authenticateToken);
app.use('/api/matches', authenticateToken);

// Startup Routes
app.get('/api/startups', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM startups');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching startups:', err);
    res.status(500).json({ error: 'Failed to fetch startups' });
  }
});

app.get('/api/startups/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM startups WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Startup not found' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching startup:', err);
    res.status(500).json({ error: 'Failed to fetch startup' });
  }
});

app.post('/api/startups', validateStartup, async (req, res) => {
  try {
    const { name, description, industry, stage, location, website } = req.body;
    const [result] = await pool.query(
      'INSERT INTO startups (user_id, name, description, industry, stage, location, website) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, name, description, industry, stage, location, website]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating startup:', err);
    res.status(500).json({ error: 'Failed to create startup' });
  }
});

app.put('/api/startups/:id', validateStartup, async (req, res) => {
  try {
    const { name, description, industry, stage, location, website } = req.body;
    const [result] = await pool.query(
      'UPDATE startups SET name = ?, description = ?, industry = ?, stage = ?, location = ?, website = ? WHERE id = ?',
      [name, description, industry, stage, location, website, req.params.id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Startup not found' });
      return;
    }
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    console.error('Error updating startup:', err);
    res.status(500).json({ error: 'Failed to update startup' });
  }
});

// Investor Routes
app.get('/api/investors', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM investors');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching investors:', err);
    res.status(500).json({ error: 'Failed to fetch investors' });
  }
});

app.get('/api/investors/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM investors WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Investor not found' });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching investor:', err);
    res.status(500).json({ error: 'Failed to fetch investor' });
  }
});

app.post('/api/investors', validateInvestor, async (req, res) => {
  try {
    const { name, bio, investment_focus, preferred_stages, preferred_industries } = req.body;
    const [result] = await pool.query(
      'INSERT INTO investors (user_id, name, bio, investment_focus, preferred_stages, preferred_industries) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, name, bio, investment_focus, preferred_stages, preferred_industries]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error('Error creating investor:', err);
    res.status(500).json({ error: 'Failed to create investor' });
  }
});

// Matching Routes
app.get('/api/matches/startup/:id', async (req, res) => {
  try {
    const matches = await findMatches(req.params.id);
    res.json(matches);
  } catch (err) {
    console.error('Error finding matches:', err);
    res.status(500).json({ error: 'Failed to find matches' });
  }
});

app.post('/api/matches', async (req, res) => {
  try {
    const { startup_id, investor_id, match_score } = req.body;
    const matchId = await saveMatch({ startup_id, investor_id, match_score });
    res.status(201).json({ id: matchId, ...req.body });
  } catch (err) {
    console.error('Error creating match:', err);
    res.status(500).json({ error: 'Failed to create match' });
  }
});

// Error handling middleware
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 