import { NextFunction, Request, Response, Router } from "express";
import { userContoller } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";

import httpstatus from "http-status";

const router = Router();

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

router.post("/register", userContoller.registerUser);

// user will be get between token
router.get(
  "/me",
  (req: Request, res: Response, next: NextFunction) => {
    //authorization work
    const { accessToken } = req.cookies;
    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );

    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }
    const { name, email, id, role } = verifiedToken;

    //Role comming in prisma
    //user role default jeta takle and seta jodi hoi tokon response ta dekabe
    //role jodi user hoi and Role.USER eta na dei tahole user user er res dekte parbe na
    const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

    //array er ekti includes method ache
    if (!requiredRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        statusCode: httpstatus.FORBIDDEN,
        message: "Forbidden. You don't have permission to access this resource",
      });
    }

    //role jodi matech kore
    //amra req.user morde decoded er value gola pass kore ditechi

    req.user = {
      email,
      name,
      id,
      role,
    };
    next();
  },
  userContoller.getMyprofile,
);

export const userRoutes = router;
