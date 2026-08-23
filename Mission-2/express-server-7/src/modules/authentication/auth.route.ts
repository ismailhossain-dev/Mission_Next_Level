//authentication jwt-1 ekane amra jwt kaj ta korechi
import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

//accessToken post rotue jwt 
router.post ("/login", authController.loginUser)

// referesh token post route jwt
router.post("/refresh-token", authController.refreshToken)
export const jwtRoute = router;