import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router()
router.post("/",auth(Role.USER, Role.AUTHOR, Role.Admin), postController.createPost)

router.get("/my-posts",auth(Role.USER, Role.AUTHOR, Role.AUTHOR),  postController.getMyPost)


router.get("/:postId", postController.getPostById)
export const postRoutes = router; 