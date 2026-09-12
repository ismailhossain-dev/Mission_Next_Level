import { Router } from "express";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();
//private api
router.post(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.createPost,
);

//public api
router.get("/", postController.getAllPosts);

router.get("/stats", auth(Role.ADMIN), postController.getPostsState);

router.get(
  "/my-posts",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.getMyPosts,
);
//public api
router.get("/:postId", postController.getPostById);

router.patch(
  "/:postId",
  auth(Role.ADMIN, Role.USER, Role.ADMIN),
  postController.updatePost,
);

router.delete(
  "/:postId",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  postController.deletePost,
);

export const postRoute = router;
