import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { ILoginUser } from "./user.interface";
import jwt from "jsonwebtoken";
import config from "../../config";
//generate webjsontoken
const loginUserIntoDB = async (payload: ILoginUser) => {
  const { email, password } = payload;
  //check the user exists in database
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email =$1
        `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invalid Credentials JWT !");
  }

  const user = userData.rows[0];

  //compere the password with bycryptjs

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials Password");
  }

  //create payload for sent in jwt
  const userPayload =  {
    id: user.id,
    name: user.name,
    role:user.role,
    is_active: user.is_active,
    email: user.email
  }

  const accessToken = jwt.sign(userPayload, config.secret_key as string , {
    expiresIn: "1d"
  })


  // console.log(accessToken)
  return {accessToken}
};

export const authService = {
  loginUserIntoDB,
};
