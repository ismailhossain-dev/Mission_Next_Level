import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const id = req.user?.id;

    const result = await postService.createPostInDB(payload, id as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Post created Successfully",
      data: result,
    });
  },
);

const getMyPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const result = await postService.getMyPostFromDB(authorId as string);
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.OK,
      message: "My post retrived successflly",
      data: result,
    });
  },
);


const getPostById = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const {id} = req.params;
    const result = await postService.getMyPostByIdFromDB(id as string)
    sendResponse(res, {
        success: true, 
        statusCode:httpStatus.OK,
        message: "User retrived sucessfully",
        data: result
    })
})

export const postController = {
  createPost,
  getMyPost,
  getPostById
};
