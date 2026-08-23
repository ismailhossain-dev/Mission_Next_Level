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

const getAllUserFromDB = async (payload: IUser) => {
  const result = await pool.query(`
      SELECT * FROM users
    `);

  return result;
};

const getSingleUserIntoDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUserIntoDB = async (
    id: string | undefined,
    name: string | undefined,
    password: string | undefined,
) => {

    const result = await pool.query(
        `
        UPDATE users SET
            name = COALESCE($1, name),
            password = COALESCE($2, password)
        WHERE id = $3
        RETURNING *
        `,
        [name, password, id]
    );

    return result;
};


const deleteUserIntoDB = async(id:string)=> {
  const result = await pool.query(`
    DELETE FROM users WHERE id=$1 RETURNING *
    `, [id])
    return result
}
export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserIntoDB,
  updateUserIntoDB,
  deleteUserIntoDB
};
