import { Router } from "express";
import { userController } from "./user.conroller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.regiterUser);
router.get(
  "/me",
  auth(Role.USER, Role.Admin, Role.AUTHOR),
  userController.getMyProfile,
);

router.put("/my-profile",auth(Role.USER, Role.Admin, Role.AUTHOR), userController.updateMyPRofile);
export const userRoutes = router;
