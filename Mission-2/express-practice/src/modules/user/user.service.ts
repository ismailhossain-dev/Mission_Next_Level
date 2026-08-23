import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcypt from "bcryptjs";
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;
  const hashPassword = await bcypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users(name , email, password, role) VALUES ($1, $2, $3, COALESCE($4, 'user')) RETURNING * 
        `,
    [name, email, hashPassword, role],
  );

  return result;
};

const getAllUserFromDB = async (payload:IUser)=> {
  const result = await pool.query(`
      SELECT * FROM users
    `)

    return result; 
}


const getSingleUserIntoDB = async (id:string)=> {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result; 
}

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserIntoDB
};
