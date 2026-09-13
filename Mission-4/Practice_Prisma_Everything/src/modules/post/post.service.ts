import { prisma } from "../../lib/prisma";
import { ICreatePOstPayload } from "./post.interface";

const createPostInDB = async (payload: ICreatePOstPayload, userId: string) => {
  if (!userId) {
    throw new Error("User id not found");
  }
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });

  return result;
};

const getMyPostFromDB = async (authorId: string) => {
  const posts = await prisma.post.findMany({
    where: {
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
};

const getMyPostByIdFromDB = async(postId:string)=> {
    if(!postId){
        throw new Error ("Post Id not found ")
    }

    const result = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    })
}
export const postService = {
  createPostInDB,
  getMyPostFromDB,
  getMyPostByIdFromDB
};
