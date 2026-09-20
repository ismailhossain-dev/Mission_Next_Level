import { NextFunction, Request, Response, Router } from "express";
import { premiumController } from "./premium.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { subscriptionsGuard } from "../../middleware/premiumGuard";



const router = Router()
//check user is logined user auth
//just reponse see only subscribed user 
//when get all post , don't come this post
router.get("/", auth(Role.ADMIN, Role.AUTHOR, Role.USER),subscriptionsGuard(),
 premiumController.getPremiumServices)

export const premiumRoutes = router