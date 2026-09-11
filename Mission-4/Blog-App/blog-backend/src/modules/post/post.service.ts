import { prisma } from "../../lib/prisma";
import { ICreatePostPayload } from "./post.interface";

//user multiple post korte parbe
//userId ta middleware/auth.ts teke pabo
const createPost = async(payload:ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
        ...payload,
        //post ta kon user e create korche seta janar jonno authorId lagbe
        authorId: userId
    }
  })
  return result; 
};

const getAllPosts = async() => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true
        }
      },
      comments: true
    }
  })
  return posts; 
};

const getPostById = () => {};

const updatePost = () => {};

const deletePost = () => {};

const getPostsStates = () => {};

const getMyPosts = () => {};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStates,
  getMyPosts,
};
