import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../types";

const router = Router();

router.post("/", userController.createUser);
//authorization get all user
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.seller),
  userController.getAllUser,
);
router.get("/:id", userController.getSingleUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export const useRoute = router;
