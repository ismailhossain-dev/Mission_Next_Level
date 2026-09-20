import { Router } from "express";
import { premiumController } from "./premium.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()
//check user is logined
router.get("/",auth(Role.ADMIN, Role.AUTHOR, Role.USER), premiumController.getPremiumServices)

export const premiumRoutes = router