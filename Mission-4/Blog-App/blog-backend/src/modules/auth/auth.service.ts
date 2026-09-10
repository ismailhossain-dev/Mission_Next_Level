import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  console.log(email, password);
  //steo-1: user isExist in db
  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  });

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new Error("Password is incorrect");
  }

  //generate access token
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
  //   expiresIn: config.jwt_access_expires_in,
  // } as SignOptions);

  const accessToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_access_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  //generate refresh token
  const refreshToken = jwtUtils.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    config.jwt_access_expires_in as SignOptions,
  );

  return {
    accessToken,
    refreshToken,
  };
};


//refershToker er kaj holo notun kore ekta accessToken create kore user ke diye deowa
const refreshToken = async(refreshToken: string)=> {
  //1.refresh token verify
  const verifyedRefreshToken = jwtUtils.verifyToken(refreshToken, config.jwt_refresh_secret)

  if(!verifyedRefreshToken.success) {
    throw new Error(verifyedRefreshToken.error)
  }

  const {id} = verifyedRefreshToken.data as JwtPayload; 
  //2.find user between db

  const user = await prisma.user.findUniqueOrThrow({
    where: {id}
  })

  if(user.activeStaus=== "BLOCKED"){
    throw new Error("User id blocke, please conect support")
  }

  //3.create new access token 
  const jwtPayload = {
    id,
    name: user.name, 
    email: user.email,
    role: user.role
  }

  const accessToken = jwtUtils.createToken(jwtPayload, config.jwt_access_secret, config.jwt_access_expires_in as SignOptions)

  //ruturn signle hole as a object hisabe return korbo 
  return {accessToken};
}
export const authService = {
  loginUser,
  refreshToken
};

