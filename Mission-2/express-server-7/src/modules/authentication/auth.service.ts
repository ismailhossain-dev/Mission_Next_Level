//authentication jwt-3
import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";
const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  //1.Cheek the if user exist amra db te user take find korchi jodi na take tahole to login korte divo na .and console dekte pabo user takle-> Done

  //2.Compere password->Done
  //3.Generate Token->done
  const userData = await pool.query(
    `
        SELECT * FROM users WHERE email =$1  
        `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("Invaild Credentials JWT !");
  }

  const user = userData.rows[0];

  // password ta bcrypt sathe compere korte hobe
  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    throw new Error("Invaild Credentials JWT !");
  }
  //console.log("jwt user ", user);

  // ===Genarate Access Token Token m:8 v:9 ========
  // jwt ti ke ei ei information gola disi and agola diye verify korchi
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "7d",
  });
  //generate refresh token M:9 V:6
  //browser cokkie =>etar kaj ta amra auth.controller.ts and ei token take browser cokkie te set korbo
  const refreshToken = jwt.sign(jwtPayload, config.refresh_secret as string, {
    expiresIn: "1d",//set token expire date most important
  });

  //==eta amra api/user get response e pataidisi========
  return { accessToken, refreshToken };
};

//v:7 secure refresh token  api

const generateFreshToken = async (token: string) => {
  if (!token) {
    throw new Error("Unauthorized!!!");
  }

  const decoded = jwt.verify(
    token as string,
    config.refresh_secret as string,
  ) as JwtPayload;

  const userData = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
      `,
    [decoded.email],
  );

  const user = userData.rows[0];

  if (userData.rows.length === 0) {
    throw new Error("User not found");
  }

  console.log(user);

  if (!user?.is_active) {
    throw Error("Forbidden");
  } //succesfully validation complete

  //sob validation far korar por token genarate korte parbe
  const jwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
    is_active: user.is_active,
    email: user.email,
  };
  const accessToken = jwt.sign(jwtPayload, config.secret as string, {
    expiresIn: "1d",
  });

  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
  generateFreshToken,
};
