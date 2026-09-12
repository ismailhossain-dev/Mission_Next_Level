import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginPayload } from "./auth.interface";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";

const loginUser = async (payload: ILoginPayload) => {
  const { email, password } = payload;
  //check user exist
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const hashPassword = await bcrypt.compare(password, user.password);
  if (!hashPassword) {
    throw new Error("Password is incorrect");
  }

  //generate jwt token

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  //generate refresh token
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_refresh_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};

//ekane user er block korar kaj ta kora hobe

const refreshToken = async (refreshToken: string) => {
  const verfiledRefresToken = jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret,
  );

  console.log(verfiledRefresToken);

  if (!verfiledRefresToken.success) {
    throw new Error(verfiledRefresToken.error);
  }
  const { id } = verfiledRefresToken.data as JwtPayload;

  //check userExist id database

  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
  });

  if(user.activeStatus === "BLOCKED"){
    throw new Error("Your account is blocked . Please contact support")
  }

  //create new access token 
  const jwtPayload = {
    id : user.id,
    name: user.name,
    email: user.email,
    role: user.role
  }

  const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions)


  return {accessToken}
};

export const authService = {
  loginUser,
  refreshToken,
};
