import { NextFunction, Request, Response } from "express"
import { catechAsync } from "../../utils/catechAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"

//One user can create multiple post
const createPost = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const id = req.user?.id;
    const paylaod = req.body; 

    const result = await postService.createPost(paylaod, id as string)

    sendResponse(res, {
        success: true,
        statusCode:httpStatus.CREATED,
        message: "Post Created Successfully",
        data: result,
    })
})
const getAllPosts = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const result = await postService.getAllPosts();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Get retrived successfully",
        data: result
    })
})  
const getMyPosts = catechAsync(async (req:Request, res:Response, next:NextFunction)=> {})
const getPostById = catechAsync((req:Request, res:Response, next:NextFunction)=> {})
const updatePost = catechAsync(async (req:Request, res:Response, next:NextFunction)=> {})
const deletePost = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {})


const getPostsState = ()=> {}
export const postController={
createPost,
getAllPosts,
getPostsState,
getMyPosts,
getPostById,
updatePost,
deletePost
}