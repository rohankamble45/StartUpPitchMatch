show databases;
use pitchmatch;
CREATE TABLE startups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    industry_tags TEXT, -- Comma-separated string
    stage VARCHAR(50),
    location VARCHAR(100),
    pitch_deck_url TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE investors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    preferred_industries TEXT, -- Comma-separated
    preferred_stages TEXT,
    ticket_size_min INT,
    ticket_size_max INT,
    location VARCHAR(100)
);
CREATE TABLE matches (
    startup_id INT,
    investor_id INT,
    match_score FLOAT,
    status VARCHAR(20) DEFAULT 'pending',
    last_interaction_date TIMESTAMP,
    PRIMARY KEY (startup_id, investor_id),
    FOREIGN KEY (startup_id) REFERENCES startups(id) ON DELETE CASCADE,
    FOREIGN KEY (investor_id) REFERENCES investors(id) ON DELETE CASCADE
);
CREATE TABLE pitch_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startup_id INT,
    investor_id INT,
    pitch_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    notes TEXT,
    FOREIGN KEY (startup_id) REFERENCES startups(id),
    FOREIGN KEY (investor_id) REFERENCES investors(id)
);
-- Sample Startups
INSERT INTO startups (name, description, industry_tags, stage, location, pitch_deck_url)
VALUES 
('AgroAI', 'AI-powered precision farming platform', 'agriculture,ai', 'MVP', 'Bangalore', 'http://agroai.com/pitch.pdf'),
('MediChain', 'Blockchain for medical records', 'healthcare,blockchain', 'Ideation', 'Delhi', 'http://medichain.com/pitch.pdf');

-- Sample Investors
INSERT INTO investors (name, bio, preferred_industries, preferred_stages, ticket_size_min, ticket_size_max, location)
VALUES 
('Anita Verma', 'Angel investor in agritech and sustainability', 'agriculture', 'MVP,growth', 50000, 200000, 'Mumbai'),
('Rajat Mehta', 'Seed-stage tech investor', 'healthcare,fintech', 'ideation,MVP', 10000, 100000, 'Hyderabad');
INSERT INTO startups (name, description, industry_tags, stage, location, pitch_deck_url)
VALUES
('AgriTechNow', 'Revolutionizing farming with smart sensors', 'agriculture,AI', 'MVP', 'Pune', 'http://example.com/deck1'),
('HealthBuddy', 'AI-powered telehealth platform', 'healthcare,AI', 'ideation', 'Bangalore', 'http://example.com/deck2');
SELECT * FROM startups;
INSERT INTO matches (startup_id, investor_id, match_score, status)
VALUES (1, 1, 0.85, 'pending');
UPDATE matches SET status = 'connected' WHERE startup_id = 1 AND investor_id = 1;


