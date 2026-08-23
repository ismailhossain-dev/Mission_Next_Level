import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
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

      console.log("middleware auth.ts decoded", decoded); //successfully

      //==find user between email===

      const userData = await pool.query(
        `
    SELECT * FROM users WHERE email = $1
    `,
        [decoded.email],
      );

      //   console.log("UserData from db", userData);

      if (userData.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: "middleware auth.ts user not found",
        });
      }

      const user = userData.rows[0];

      //is_active true na hole
      if (!user?.is_active) {
        res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      //imporant configuration admin & seller role chara api ta access korte parbe na

      if (roles.length && !roles.includes(user.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden !! | This route have no access for user",
        });
      }

      //decoded er morder user take set kore diyechi
      req.user = decoded; 

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
