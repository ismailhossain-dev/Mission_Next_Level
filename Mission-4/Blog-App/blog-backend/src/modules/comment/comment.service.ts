import { prisma } from "../../lib/prisma";
import {
  ICreateCommentPayload,
  IUpdateCommentPayload,
} from "./comment.interfce";

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

const updateComment = async (
  authorId: string,
  data: IUpdateCommentPayload,
  commentId: string,
) => {
  //check comment exist in database

  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  if (!commentData) {
    throw new Error("Comment not found");
  }

  //update comment

  const comment = await prisma.comment.update({
    where: {
      id: commentId,
      authorId,
    },
    data,
  });

  return comment;
};

const deleteComment = async (authorId: string, commentId: string) => {
  //check comment exist in database
  const commentData = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
      authorId,
    },
    //id ta nichi
    select: {
      id: true,
    },
  });

  const result = await prisma.comment.delete({
    where: {
      id: commentData.id,
    },
  });

  return result;
};
export const commentService = {
  createComment,
  getCommetByAuthorId,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
