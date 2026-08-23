import {Pool} from "pg"
import config from "../config"
export const pool = new Pool({
    connectionString: config.Connecting_String
})

export const initDB =async ()=> {
    try {
        //create table
    // await pool.query(``)
    console.log("Database connected successfully!!")
    } catch (error:any) {
        console.log("Failed database connected !!")
    }
}