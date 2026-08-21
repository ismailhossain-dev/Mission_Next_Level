// user.controller.ts request response handle kora chara ja kichu take segola amra ekane handle korbo & handle database query

import { pool } from "../../db";
import type { IUser } from "./user.interface";
//1. ei functon ta amra user.controller.ts user korbo
//eta holo user post method
const createUserIntoDB = async (payload: IUser) => {
  const { name, email, password, age } = payload;
  const result = await pool.query(
    `INSERT INTO users(name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, password, age],
  );
  //user.controller.ts ekta error asche like Property 'rows' does not exist on type 'void'. so eta solve korar jonno return result kora holo
  return result;
};

// Get all user function

const getAllUsersFromDB = async (payload: IUser) => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

// get single user

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return result;
};

// update user query

const updateUserIntoDB = async (
  id: string,
  name: string | undefined,
  password: string | undefined,
  age: number | undefined,
) => {
  // 1. 'await' add kora hoyeche ebong id=$4 kora hoyeche
  /**
     * COALESCE => use korle update korar somoy kono filed update na korle eta update hoye null hobe na
     * 
     CORLESCE BENIFITES=> holo amra 4ta filed teke spacific 2ta o update korte parbo
     */
  const result = await pool.query(
    `UPDATE users SET 
    name = COALESCE($1, name),
    password = COALESCE($2, password), 
    age = COALESCE($3, age),
    is_active = COALESCE($4, is_active)
    WHERE id = $5 
    RETURNING *`,
    [name, password, age, true, id], // Ekhane 5ta value thakte hobe: $1, $2, $3, $4, ebong $5 (id)
  );

  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
  updateUserIntoDB,
};
