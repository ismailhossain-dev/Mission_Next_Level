import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// router.post
router.post ("/login", authController.loginUser)

export const jwtRoute = router;