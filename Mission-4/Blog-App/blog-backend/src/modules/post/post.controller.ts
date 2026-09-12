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
        message: "All Post Retrived Successfully",
        data: result
    })
})  

const getMyPosts = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the user ID from auth middleware
    const authorId = req.user?.id;

    // Get all posts created by the logged-in user
    const result = await postService.getMyPosts(authorId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Posts Retrieved Successfully",
      data: result,
    });
  }
);


const getPostById = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const {postId} = req.params; 
    //id na takle user ke basai patai divo 
    if(!postId){
        throw new Error("Post Id Required In Params")
    }
   const result = await postService.getPostById(postId as string);

   sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Single Post Retrived Successfully",
    data: result
   })
})
const updatePost = catechAsync(async (req:Request, res:Response, next:NextFunction)=> {
    console.log("hello")
    const postId = req.params.postId; 
     if(!postId){
        throw new Error("Post Id Required In Params")
    }
    const payload = req.body; 
    const authorId = req.user?.id; 
    const isAdmin = req.user?.role === "ADMIN"; 
     await postService.updatePost(postId as string, payload, authorId as string, isAdmin)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post Updated Successfully",
        //delete hole response dekabo na
        data: null
    })
})


const deletePost = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const postId = req.params.postId;
    if(!postId){
        throw new Error("Post Id Required In Params")
    }
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";

    const result = await postService.deletePost(postId as string, authorId as string, isAdmin)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post delete successfully!",
        data: result
    })

})


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