import { NextFunction, Request, Response } from "express";
import { catechAsync } from "../../utils/catechAsync";
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const createComment = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const result = await commentService.createComment(
      authorId as string,
      req.body,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Comment created successfully",
      data: result,
    });
  },
);
const getCommetByAuthorId = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.body;
    const result = await commentService.getCommetByAuthorId(postId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Comment retrived successfully in authorId",
      data: result,
    });
  },
);
const getCommentsByPostId = catechAsync(
  async (req: Request, res: Response) => {
    const postId = req.params.id;

    const result = await commentService.getCommentsByPostId(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Comments retrieved successfully",
      data: result,
    });
  },
);
const updateComment = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const deleteComment = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

const moderateComment = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
export const commentController = {
  createComment,
  getCommetByAuthorId,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  moderateComment,
};
