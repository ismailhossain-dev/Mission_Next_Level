import { Router } from "express";
import { userController } from "./user.conroller";

const router = Router();
router.post("/register", userController.regiterUser)
export const userRoutes = router;