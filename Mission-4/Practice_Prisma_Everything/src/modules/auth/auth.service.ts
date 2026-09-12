import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginPayload } from "./auth.interface";
import { SignOptions } from "jsonwebtoken";
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

// const refreshToken = async(payload)

export const authService = {
  loginUser,
  // refreshToken
};
