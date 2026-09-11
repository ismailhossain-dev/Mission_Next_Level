import { NextFunction, Request, Response } from "express"
import { catechAsync } from "../../utils/catechAsync"

const createPost = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {})
const getAllPosts = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {})  
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