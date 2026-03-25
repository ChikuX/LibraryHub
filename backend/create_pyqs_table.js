import "dotenv/config";
import pool from "./src/db.js";

async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS pyqs (
      id SERIAL PRIMARY KEY,
      display_name TEXT,
      display_course TEXT,
      display_department TEXT NULL,
      display_semester INT,
      year INT,
      file_url TEXT,
      status TEXT,
      subject TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    // console.log("pyqs table created successfully");
  } catch (err) {
    console.error("Error creating pyqs table:", err);
  } finally {
    pool.end();
  }
}

createTable();
