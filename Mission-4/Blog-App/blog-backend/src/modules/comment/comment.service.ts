import { prisma } from "../../lib/prisma";
import { ICreateCommentPayload } from "./comment.interfce";

const createComment = async (
  authorId: string,
  payload: ICreateCommentPayload,
) => {
  //postId diye check kora hoitese database e post ta exist kore kina
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });

  const comment = await prisma.comment.create({
    data: {
      ...payload,
      authorId,
    },
  });

  return comment;
};

const getCommetByAuthorId = async (authorId: string) => {
  if (!authorId) {
    throw new Error("Author Id not found!!");
  }
  //ekta user onek gola comment korte pare
  const result = await prisma.comment.findMany({
    where: {
      authorId,
    },
  });

  return result; 
};


const getCommentsByPostId = async (postId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
  });

  return comments;
};
export const commentService = {
  createComment,
  getCommetByAuthorId,
  getCommentsByPostId
};
