import { Router } from "express";
import { userContoller } from "./user.controller";

const router = Router();

router.post("/register", userContoller.registerUser)

// user will be get between token 
router.get("/me", userContoller.getMyprofile)

export const userRoutes = router; 