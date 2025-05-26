-- Create database if not exists
CREATE DATABASE IF NOT EXISTS pitchmatch;
USE pitchmatch;

-- Users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('startup', 'investor') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Startups table
CREATE TABLE IF NOT EXISTS startups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    industry VARCHAR(100),
    stage VARCHAR(50),
    location VARCHAR(100),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_industry (industry),
    INDEX idx_stage (stage)
);

-- Investors table
CREATE TABLE IF NOT EXISTS investors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    investment_focus VARCHAR(255),
    preferred_stages VARCHAR(255),
    preferred_industries VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_investment_focus (investment_focus)
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startup_id INT NOT NULL,
    investor_id INT NOT NULL,
    match_score DECIMAL(5,2),
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (startup_id) REFERENCES startups(id),
    FOREIGN KEY (investor_id) REFERENCES investors(id),
    UNIQUE KEY unique_match (startup_id, investor_id),
    INDEX idx_status (status)
);

-- Pitches table
CREATE TABLE IF NOT EXISTS pitches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    match_id INT NOT NULL,
    scheduled_date TIMESTAMP,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches(id),
    INDEX idx_scheduled_date (scheduled_date)
);

-- Insert test data
INSERT INTO users (email, password_hash, user_type) VALUES
('startup1@example.com', 'hashed_password_1', 'startup'),
('startup2@example.com', 'hashed_password_2', 'startup'),
('investor1@example.com', 'hashed_password_3', 'investor'),
('investor2@example.com', 'hashed_password_4', 'investor');

-- Get the user IDs for startups and investors
SET @startup1_id = (SELECT id FROM users WHERE email = 'startup1@example.com');
SET @startup2_id = (SELECT id FROM users WHERE email = 'startup2@example.com');
SET @investor1_id = (SELECT id FROM users WHERE email = 'investor1@example.com');
SET @investor2_id = (SELECT id FROM users WHERE email = 'investor2@example.com');

INSERT INTO startups (user_id, name, description, industry, stage, location) VALUES
(@startup1_id, 'TechStart Inc.', 'AI-powered business solutions', 'AI', 'Seed', 'San Francisco'),
(@startup2_id, 'GreenTech Solutions', 'Sustainable energy solutions', 'CleanTech', 'Series A', 'New York');

INSERT INTO investors (user_id, name, bio, investment_focus, preferred_stages, preferred_industries) VALUES
(@investor1_id, 'John Smith', 'Experienced tech investor', 'Early-stage tech', 'Seed,Series A', 'AI,CleanTech'),
(@investor2_id, 'Jane Doe', 'Sustainability focused investor', 'Green technology', 'Series A,Series B', 'CleanTech');

-- Get the startup and investor IDs
SET @startup1_id = (SELECT id FROM startups WHERE name = 'TechStart Inc.');
SET @startup2_id = (SELECT id FROM startups WHERE name = 'GreenTech Solutions');
SET @investor1_id = (SELECT id FROM investors WHERE name = 'John Smith');
SET @investor2_id = (SELECT id FROM investors WHERE name = 'Jane Doe');

INSERT INTO matches (startup_id, investor_id, match_score, status) VALUES
(@startup1_id, @investor1_id, 0.85, 'pending'),
(@startup2_id, @investor2_id, 0.92, 'accepted');

-- Get the match IDs
SET @match1_id = (SELECT id FROM matches WHERE startup_id = @startup1_id AND investor_id = @investor1_id);
SET @match2_id = (SELECT id FROM matches WHERE startup_id = @startup2_id AND investor_id = @investor2_id);

INSERT INTO pitches (match_id, scheduled_date, status) VALUES
(@match1_id, '2024-03-15 14:00:00', 'scheduled'),
(@match2_id, '2024-03-20 10:00:00', 'completed'); 