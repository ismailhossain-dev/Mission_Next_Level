import { Router } from "express";
import { userContoller } from "./user.controller";

import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";
const router = Router();
router.post("/register", userContoller.registerUser);

// user will be get between token
router.get(
  "/me",
  // (req: Request, res: Response, next: NextFunction) => {
  //   //authorization work
  //   const { accessToken } = req.cookies;
  //   // Token verify
  //   const verifiedToken = jwtUtils.verifyToken(
  //     accessToken,
  //     config.jwt_access_secret,
  //   );

  //   //check verified token
  //   if (!verifiedToken.success) {
  //     throw new Error(verifiedToken.error);
  //   }
  //   const { name, email, id, role } = verifiedToken.data as JwtPayload;

  //   //Role comming in prisma
  //   const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

  //   //array er ekti includes method ache and role na matech na korle
  //   if (!requiredRoles.includes(role)) {
  //     return res.status(403).json({
  //       success: false,
  //       statusCode: httpstatus.FORBIDDEN,
  //       message: "Forbidden. You don't have permission to access this resource",
  //     });
  //   }

  //   //role jodi matech kore
  //   //amra req.user morde decoded er value gola pass kore ditechi

  //   req.user = {
  //     email,
  //     name,
  //     id,
  //     role,
  //   };
  //   next();
  // },

  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  userContoller.getMyprofile,
);

//user profile update api and get user authorization ta set kore divo

router.put("/my-profile", auth(Role.ADMIN, Role.USER, Role.AUTHOR), userContoller.updateMyProfile)

export const userRoutes = router;
