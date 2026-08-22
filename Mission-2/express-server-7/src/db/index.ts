// neondb connect with server and databse er sob kaj korbo ekane like create table
import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connnection_string,
});

//==========crete neondb database table
//====IF NOT EXISTS mane holo table ekbar create hole er create hobe na validation

//paswrod ekane VARCHAR use kori nai because amr password hash e rakbo and koro word hobe seta janbo na
export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        name  VARCHAR(25),
        email VARCHAR(30) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        role VARCHAR(15) DEFAULT  'user',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        )
    `);

  // create a profile table M:8 V:5
await pool.query(`
    CREATE TABLE IF NOT EXISTS profiles(
        id SERIAL PRIMARY KEY, 
        user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        bio TEXT,
        address TEXT,
        phone VARCHAR(15),
        gender VARCHAR(10),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
`);

  //console kore dektechi daabase create hoitese kina
  console.log("database connectend successfully");
};
