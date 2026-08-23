import { Router } from "express";
import { authController } from "./auth.controller";
//create jwt token
const router =  Router()
router.post("/login", authController.loginUser)
export const  autRoute = router; 