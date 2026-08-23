import { Pool } from "pg";
import config from "../config";
export const pool = new Pool({
  connectionString: config.Connection_String,
});

export const initDB = async () => {

    //create user table
await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(25),
        email VARCHAR(30) UNIQUE NOT NULL,
        password TEXT NOT NULL,
       role VARCHAR(15) DEFAULT 'user',
         is_active BOOLEAN DEFAULT true,
        create_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`);

    console.log("Database connected successfully!!");
  
};
