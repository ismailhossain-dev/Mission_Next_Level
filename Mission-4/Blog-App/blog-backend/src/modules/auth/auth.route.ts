import { Router } from "express";
import { authController } from "./auth.controlle";

const router = Router();

router.post("/login", authController.loginUser)
export const authRoutes = router; 