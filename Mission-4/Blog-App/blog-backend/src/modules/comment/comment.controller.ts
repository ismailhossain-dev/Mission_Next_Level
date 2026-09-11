import { NextFunction, Request, Response } from "express";
import { catechAsync } from "../../utils/catechAsync";

const createComment = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getCommetByAuthorId = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);
const getCommentsByCommaentId = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
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
  getCommentsByCommaentId,
  updateComment,
  deleteComment,
  moderateComment,
};
