import { NextFunction, Request, Response, Router } from "express";
import { premiumController } from "./premium.controller";
import { auth } from "../../middleware/auth";
import { Role, SubscriptionStatus } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { prisma } from "../../lib/prisma";

const router = Router()
//check user is logined user auth
//just reponse see only subscribed user 
//when get all post , don't come this post
router.get("/", auth(Role.ADMIN, Role.AUTHOR, Role.USER),catchAsync(async (req:Request, res:Response, next:NextFunction)=> {
    const userId = req.user?.id;
    const subscription = await prisma.subscription.findUnique({
        where: {
            userId
        }
    })

    if(subscription?.status !== SubscriptionStatus.ACTIVE){
        throw new Error ("You are not subscribed")
    }
}),
 premiumController.getPremiumServices)

export const premiumRoutes = router