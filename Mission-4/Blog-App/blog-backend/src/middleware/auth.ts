import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { catechAsync } from "../utils/catechAsync";
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
export const auth = (...requiredRoles: Role[]) => {
  return catechAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      /** ekane 3ta kaj hoitese
       * 1.check korchi cokkie te token ta ache kina
       * 2.|| check ditechi authorization er morder Bearer name kichu ache kina jodi take tahole spili use kore bearer bad diye 1 indext teke token ta naw
       * 3.jodi konota na hoi tahole direct headers mardome authorization token ta naw
       */
      // const token =
      //   req.cookies.accessToken ||
      //   req.headers.authorization?.startsWith("Bearer")
      //     ? req.headers.authorization?.split(" ")[1]
      //     : req.headers.authorization;
      const token = req.cookies.accessToken
        ? req.cookies.accessToken
        : req.headers.authorization?.startsWith("Bearer")
          ? req.headers.authorization?.split(" ")[1]
          : req.headers.authorization;

      //token nai mane holo user login kore nai
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
      //user id, name , email ta diye cheeck korbo user ta exist korche kina

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

      //check user activeStatus (most important)

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


