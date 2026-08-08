// neondb connect with server and databse er sob kaj korbo ekane like create table
import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString:config.connnection_string
   ,
});

//==========crete neondb database table
//====IF NOT EXISTS mane holo table ekbar create hole er create hobe na validation

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        name  VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        )
    `);

  //console kore dektechi daabase create hoitese kina
  console.log("database connectend successfully");
};