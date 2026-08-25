//user post route & user mini server
import { Router } from "express";
import { userController } from "./user.controller";

import { USER_ROLE } from "../../types";
import auth from "../../middleware/auth";


const router = Router()

router.post("/",userController.createUser );
// get All user ei route admin & agent route chara er kew access korte parbe na ei route take


router.get("/",auth(), userController.getAllUsers);

router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id",userController.deleteUser )


export const useRoute = router;