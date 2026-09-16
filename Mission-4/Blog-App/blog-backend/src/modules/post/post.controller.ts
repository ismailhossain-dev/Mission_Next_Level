import { NextFunction, Request, Response } from "express"
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { catchAsync } from "../../utils/catchAsync";
import { IPostquery } from "./post.interface";

//One user can create multiple post
const createPost = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
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
const getAllPosts = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
    //postman teke query ta nitese dynamic filtering and searching and pagination er jonno 
    //http://localhost:5000/api/posts?title=Ronaldo &content=Ronaldo&searchTerm=Ron&limit=1&page=2&sortBy=createdAt&orderBy=desc

    //? er por value bosale seta amra req.query morder pai and : er por value bosale seta amr req.params er vitor pai

    const query = req.query as IPostquery;

    console.log(query)
    const result = await postService.getAllPosts(query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Post Retrived Successfully",
        data: result
    })
})  

const getMyPosts = catchAsync(
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


const getPostById = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
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
const updatePost = catchAsync(async (req:Request, res:Response, next:NextFunction)=> {
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


const deletePost = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
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


//this api for admin dashboard
const getPostsState = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const result = await postService.getPostsStates();
    sendResponse(res, {
        success: false,
        statusCode: httpStatus.OK,
        message: "Post states retrived sucessfully",
        data: result
    })
})
export const postController={
createPost,
getAllPosts,
getPostsState,
getMyPosts,
getPostById,
updatePost,
deletePost
}