import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'pitchmatch'
});

export const calculateMatchScore = (startup, investor) => {
  let score = 0;
  const weights = {
    industry: 0.4,
    stage: 0.3,
    location: 0.3
  };

  // Industry match
  if (investor.preferred_industries.includes(startup.industry)) {
    score += weights.industry;
  }

  // Stage match
  if (investor.preferred_stages.includes(startup.stage)) {
    score += weights.stage;
  }

  // Location match (simplified)
  if (investor.preferred_locations.includes(startup.location)) {
    score += weights.location;
  }

  return parseFloat(score.toFixed(2));
};

export const findMatches = async (startupId) => {
  try {
    // Get startup details
    const [startup] = await pool.query(
      'SELECT * FROM startups WHERE id = ?',
      [startupId]
    );

    if (!startup[0]) {
      throw new Error('Startup not found');
    }

    // Get potential investors
    const [investors] = await pool.query('SELECT * FROM investors');

    // Calculate match scores
    const matches = investors.map(investor => {
      const score = calculateMatchScore(startup[0], investor);
      return {
        investor_id: investor.id,
        startup_id: startupId,
        match_score: score
      };
    });

    // Sort by score descending
    matches.sort((a, b) => b.match_score - a.match_score);

    return matches;
  } catch (error) {
    console.error('Error in findMatches:', error);
    throw error;
  }
};

export const saveMatch = async (match) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO matches (startup_id, investor_id, match_score) VALUES (?, ?, ?)',
      [match.startup_id, match.investor_id, match.match_score]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error in saveMatch:', error);
    throw error;
  }
}; 