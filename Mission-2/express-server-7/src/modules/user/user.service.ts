// user.controller.ts request response handle kora chara ja kichu take segola amra ekane handle korbo & handle database query

import { pool } from "../../db";
import type { IUser } from "./user.interface";
//1. ei functon ta amra user.controller.ts user korbo
//eta holo user post method
const createUserIntoDB = async (payload:IUser)=> {
    const {name, email, password, age} = payload;
 const result = await pool.query(
      `INSERT INTO users(name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, age], 
    );
    //user.controller.ts ekta error asche like Property 'rows' does not exist on type 'void'. so eta solve korar jonno return result kora holo
    return  result;
} 

// Get all user function 

const getAllUsersFromDB = async(payload:IUser)=>{

     const result = await pool.query(`SELECT * FROM users`);
     return result;
  
}


// get single user

const getSingleUser = async (id: string) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    );

    return result;
};

export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getSingleUser,
};