import { Router } from "express";
import { userContoller } from "./user.controller";

const router = Router();

router.post("/register", userContoller.registerUser)

export const userRoutes = router; 