import { Router } from "express";
import { userContoller } from "./user.controller";

const router = Router();

router.post("/register", userContoller.createUser)

export const userRoutes = router; 