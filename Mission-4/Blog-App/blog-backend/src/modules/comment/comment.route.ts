import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  commentController.createComment,
);

router.get("/author/:authorId", commentController.getCommetByAuthorId);

router.get("/:commentId", commentController.getCommentsByCommaentId);

router.patch(
  "/commentId",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  commentController.updateComment,
);

router.delete(
  "/:commentId",
  auth(Role.ADMIN, Role.USER, Role.AUTHOR),
  commentController.deleteComment,
);

router.put(
  "/:commentId/moderate",
  auth(Role.ADMIN),
  commentController.moderateComment,
);

export const commentRoute = router;
