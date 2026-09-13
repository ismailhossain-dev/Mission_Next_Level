import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import { jwtUtils } from "../utils/jwt";
import config from "../config";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { Role } from "../../generated/prisma/enums";

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

export const auth = (...requiredRoles: Role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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

    const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

    if (!verifiedToken.success) {
      throw new Error(verifiedToken.error);
    }

    const { name, email, id, role } = verifiedToken.data as JwtPayload;

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
      throw new Error("user not found. Please login again.");
    }

    if (user.activeStatus === "BLOCKED") {
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
  });
};
