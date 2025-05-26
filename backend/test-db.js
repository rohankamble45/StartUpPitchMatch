/* global process */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Environment variables with defaults
const env = process.env;
const DB_HOST = env.DB_HOST || 'localhost';
const DB_USER = env.DB_USER || 'root';
const DB_PASSWORD = env.DB_PASSWORD || '1109';
const DB_NAME = env.DB_NAME || 'pitchmatch';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });

    console.log('Successfully connected to MySQL database');

    // Test startups table
    const [startups] = await connection.execute('SELECT * FROM startups LIMIT 1');
    console.log('Startups table test:', startups.length > 0 ? 'OK' : 'No data');

    // Test investors table
    const [investors] = await connection.execute('SELECT * FROM investors LIMIT 1');
    console.log('Investors table test:', investors.length > 0 ? 'OK' : 'No data');

    await connection.end();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error testing database connection:', err);
  }
}

testConnection(); 