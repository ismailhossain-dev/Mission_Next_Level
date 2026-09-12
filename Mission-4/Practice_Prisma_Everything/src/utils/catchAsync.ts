import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
export const catchAsync = (fn: RequestHandler) => {
  //ekane async use kora hoitese because amra conroller await use korbo
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return fn(req, res, next);
    } catch (error: any) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: error.message,
        error: (error as Error).message,
      });
    }
  };
};


