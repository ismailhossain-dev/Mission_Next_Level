import { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
//generate token
const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);

  return token;
};

//verify token & decoded token

const verifyToken = (token: string, secret: string) => {
  try {
    const verifedToken = jwt.verify(token, secret);

    return {
      success: true,
      data: verifedToken,
    };
  } catch (error: any) {
    console.log("Token verification failed", error);

    return {
      success: false,
      error: error.meessage,
    };
  }
};

export const jwtUtils = {
  createToken,
  verifyToken,
};
