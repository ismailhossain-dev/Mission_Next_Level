import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";

const auth = (...roles: ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("User roles:", roles);

      // Get token from Authorization header
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access! Token is missing.",
        });
      }

      // If using: Authorization: Bearer TOKEN
      const actualToken = token.startsWith("Bearer ")
        ? token.split(" ")[1]
        : token;

      // Verify JWT
      const decoded = jwt.verify(
        actualToken as string,
        config.secret as string,
      ) as JwtPayload;

      console.log("Decoded token:", decoded);

      // Find user from database
      const userData = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [decoded.email],
      );

      // User doesn't exist
      if (userData.rows.length === 0) {
       return res.status(404).json({
          success: false,
          message: "User not found!",
        });
      }

      const user = userData.rows[0];

      console.log("User from DB:", user);

      // Check active status
      if (!user?.is_active) {
       return res.status(403).json({
          success: false,
          message: "Your account is inactive!",
        });
      }

      // Check role
      if (roles.length && !roles.includes(user.role)) {
      return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have access to this route.",
        });
      }

      // Attach user information to request
      req.user = decoded;

      // Continue to controller
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
