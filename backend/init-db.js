import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1109'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Create database
  db.query('CREATE DATABASE IF NOT EXISTS pitchmatch', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Use the database
    db.query('USE pitchmatch', (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }
      console.log('Using database pitchmatch');

      // Drop existing tables if they exist
      db.query('DROP TABLE IF EXISTS matches, pitch_history', (err) => {
        if (err) {
          console.error('Error dropping dependent tables:', err);
          return;
        }
        console.log('Dependent tables dropped successfully');

        db.query('DROP TABLE IF EXISTS startups, investors', (err) => {
          if (err) {
            console.error('Error dropping main tables:', err);
            return;
          }
          console.log('Main tables dropped successfully');

          // Create startups table
          const createStartupsTable = `
            CREATE TABLE IF NOT EXISTS startups (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              description TEXT,
              industry VARCHAR(100),
              stage VARCHAR(50),
              location VARCHAR(255),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `;

          db.query(createStartupsTable, (err) => {
            if (err) {
              console.error('Error creating startups table:', err);
              return;
            }
            console.log('Startups table created successfully');

            // Create investors table
            const createInvestorsTable = `
              CREATE TABLE IF NOT EXISTS investors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                bio TEXT,
                industry VARCHAR(100),
                location VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              )
            `;

            db.query(createInvestorsTable, (err) => {
              if (err) {
                console.error('Error creating investors table:', err);
                return;
              }
              console.log('Investors table created successfully');

              // Insert test data for startups
              const insertStartups = `
                INSERT INTO startups (name, description, industry, stage, location) 
                VALUES 
                ('TechStart Inc.', 'AI-powered business solutions', 'AI', 'MVP', 'San Francisco'),
                ('GreenTech', 'Sustainable energy solutions', 'CleanTech', 'Seed', 'New York')
              `;

              db.query(insertStartups, (err) => {
                if (err) {
                  console.error('Error inserting startup data:', err);
                  return;
                }
                console.log('Startup test data inserted successfully');

                // Insert test data for investors
                const insertInvestors = `
                  INSERT INTO investors (name, bio, industry, location) 
                  VALUES 
                  ('John Smith', 'AI investor', 'AI', 'San Francisco'),
                  ('Sarah Johnson', 'CleanTech investor', 'CleanTech', 'New York')
                `;

                db.query(insertInvestors, (err) => {
                  if (err) {
                    console.error('Error inserting investor data:', err);
                    return;
                  }
                  console.log('Investor test data inserted successfully');
                  console.log('Database initialization completed successfully!');
                  db.end();
                });
              });
            });
          });
        });
      });
    });
  });
}); 