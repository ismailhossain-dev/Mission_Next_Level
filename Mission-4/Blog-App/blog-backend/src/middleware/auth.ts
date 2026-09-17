import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../lib/prisma";

//req.user er error ta solve kore
declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        id: string;
        role: Role;
      };
    }
  }
}

//Higher order function 
//---User Login verify and permission what user accually do and set user in req.user most impornat
export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.cookies.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer")
          ? req.headers.authorization?.split(" ")[1]
          : req.headers.authorization;

      if (!token) {
        throw new Error(
          "You are not logged in. please login in to access this resource",
        );
      }

      const verifiedToken = jwtUtils.verifyToken(
        token,
        config.jwt_access_secret,
      );

      //check verified token
      if (!verifiedToken.success) {
        throw new Error(verifiedToken.error);
      }

      const { name, email, id, role } = verifiedToken.data as JwtPayload;
      //if role not matched
      if (requiredRoles.length && !requiredRoles) {
        throw new Error(
          "Forbidden, You don't have permission to access this resource",
        );
      }

      const user = await prisma.user.findUnique({
        where: {
          id,
          email,
          name,
        },
      });

      if (!user) {
        throw new Error("user not found. Please login gain.");
      }

      if (user.activeStaus === "BLOCKED") {
        throw new Error(
          "Your account has been blocked, Please contact support. ",
        );
      }

      req.user = {
        email,
        name,
        id,
        role,
      };
      next();
    },
  );
};


