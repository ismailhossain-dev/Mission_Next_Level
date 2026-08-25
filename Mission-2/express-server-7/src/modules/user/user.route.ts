//user post route & user mini server
import { Router } from "express";
import { userController } from "./user.controller";

import { USER_ROLE } from "../../types";
import auth from "../../middleware/auth";


const router = Router()

router.post("/",userController.createUser );

//user take admin and agent role dekte pabe
router.get("/",auth(USER_ROLE.admin, USER_ROLE.agent), userController.getAllUsers);

router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id",userController.deleteUser )


export const useRoute = router;