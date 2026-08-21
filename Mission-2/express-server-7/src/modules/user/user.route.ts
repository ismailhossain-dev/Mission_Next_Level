//user post route & user mini server
import { Router } from "express";
import { userController } from "./user.controller";


const router = Router()

/**
 * ei route er jonno 2ta kaj hoytese 2file e 
 * 1.app.ts eta app.user korchi and ekane route set kore disilam like app.user('/api/user')
 * 2.user.controller.ts e amra req response ta handle kortechi
 */
router.post("/",userController.createUser );
//Get All user
router.get("/", userController.getAllUsers);

//get signle user
router.get("/:id", userController.getSingleUser);

export const useRoute = router;