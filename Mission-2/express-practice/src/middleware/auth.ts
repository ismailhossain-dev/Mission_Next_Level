import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("usere roles", roles);
      //token ta pabo holo gell-user api ta hit kore key and value dile key Authorization and value jwt token
      const token = req.headers.authorization;
      console.log("autorization token ", token);

      if (!token) {
        res.status(404).json({
          success: false,
          message: "Middleware auth.ts Unauthorized access token !!",
        });
      }
      //encoded teke decoded e covert korchi and human read kore pare moto
      const decoded = jwt.verify(
        token as string,
        config.secret_key as string,
      ) as JwtPayload;

      //console.log("middleware auth.ts decoded",decoded)//successfully
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
