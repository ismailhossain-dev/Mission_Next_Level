import { prisma } from "../../lib/prisma";
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";

//user multiple post korte parbe
//userId ta middleware/auth.ts teke pabo
const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      //post ta kon user e create korche seta janar jonno authorId lagbe
      authorId: userId,
    },
  });
  return result;
};

//ekane user er post and comment er data goa niye asbo
const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return posts;
};

//=======most important api =========
const getPostById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  //post count update

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    //ekane bolvo amra ki updat korte chai
    data: {
      //increment ta kaj korbe jokon data type number takbe
      views: {
        //increment ekta express er function
        increment: 1,
      },
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });
  return updatedPost;
};

const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
//update korar jonno postId and authorId match korte hobe
  console.log("postId", postId , "authorId", authorId , "isAdmin", isAdmin)
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  // isAdmin === true → যেকোনো post update করতে পারবে
  // isAdmin === false + নিজের post → update করতে পারবে
  // isAdmin === false + অন্যের post → update করতে পারবে না
  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not the owner of this post!");
  }

  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: payload,
    include: {
      //author er vitor user ta pabo
      author: {
        omit: {
          password: true,
        },
      },
      comments: true,
    },
  });

  return result;
};

const deletePost = () => {};

const getPostsStates = () => {};

//login user er id ta holo authorId
const getMyPosts = async (authorId: string) => {
  const result = await prisma.post.findMany({
    where: {
      authorId,
    },

    orderBy: {
      createAt: "desc",
    },

    include: {
      comments: true,

      author: {
        omit: {
          password: true,
        },
      },

      //eta mardome amra sorting kori
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  return result;
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStates,
  getMyPosts,
};
