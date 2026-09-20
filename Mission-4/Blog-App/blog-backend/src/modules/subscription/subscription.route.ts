import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

//login takle just user pay korte parbe
router.post("/checkout",auth(Role.USER, Role.ADMIN, Role.AUTHOR), subscriptionController.createCheckOutSession)

//This a Public Api
router.post("/webhook", subscriptionController.hanldeWebhook)
router.get("/status",auth(Role.USER, Role.ADMIN, Role.AUTHOR), subscriptionController.getSubscriptionStatus)

export const subscriptionRoute = router;