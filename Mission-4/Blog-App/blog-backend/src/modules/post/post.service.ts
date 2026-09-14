import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
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

//=======most important api user transaction & rollback =========
const getPostById = async (postId: string) => {
  // we are want to update first views then update post content
  //  await prisma.post.update({
  //     where: {
  //       id: postId,
  //     },

  //     data: {
  //       views: {
  //         increment: 1,
  //       },
  //     },
  //   });

  // //ei function transaction  & rollback use kora hoiche
  // const post = await prisma.post.findUniqueOrThrow({
  //   where: {
  //     id: postId,
  //   },
  //   //incoude use for join table and response
  //   include: {
  //     author: {
  //       omit: {
  //         password: true
  //       }
  //     },
  //     // comments: true
  //     //If we are want to just approve comemnt
  //     comments: {
  //       where: {
  //         status: CommentStatus.APPROVE
  //       },
  //       //sorting comemnt latest
  //       orderBy: {
  //         createAt: "desc"
  //       }
  //     },

  //     //count view
  //     _count: {
  //       select: {
  //         comments: true
  //       }
  //     }
  //   }
  // });
  //   return post;

  //==== transection use ===
  const transactionResult = await prisma.$transaction(
    async (tx) => {
      await tx.post.update({
        where: {
          id: postId,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
      //error asle er view count barbe na most important
      // throw new Error("Fake Error")
      //after update
      const post = await tx.post.findUniqueOrThrow({
        where: {
          id: postId,
        },
        include: {
          author: {
            omit: {
              password: true,
            },
          },
          comments: {
            where: {
              status: CommentStatus.APPROVE,
            },
            orderBy: {
              createAt: "desc",
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      return post;
    },
    {
      //max time 10ms
      maxWait: 10000,
      //default time 2ms
      timeout: 20000,
    },
  );

  return transactionResult;
};

const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
  isAdmin: boolean,
) => {
  //update korar jonno postId and authorId match korte hobe
  //console.log("postId", postId, "authorId", authorId, "isAdmin", isAdmin);
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

//update er moto delete api ta hobe.

const deletePost = async (
  postId: string,
  authorId: string,
  isAdmin: boolean,
) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && post.authorId !== authorId) {
    throw new Error("You are not owner of this post!");
  }

  await prisma.post.delete({
    where: {
      id: postId,
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

  //delete hoye jawa post er response deke ki korbo tai null kore disi
  // return null;
};

//admin dashbord e eta deakano hobe like allposts , allcomments, allPublished post
//===ekane multiple query ache tai $transection use korbo
const getPostsStates = async () => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    // const totalPost = await tx.post.count();

    // const totlaPublishedPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.PUBLISHED,
    //   },
    // });
    // const totalDraftPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.DRAFT,
    //   },
    // });
    // const totalArchivedPosts = await tx.post.count({
    //   where: {
    //     status: PostStatus.ARCHIVED,
    //   },
    // });

    // const totalComments = await tx.comment.count();

    // const totalApprovedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.APPROVE,
    //   },
    // });

    // const totalRejectedComments = await tx.comment.count({
    //   where: {
    //     status: CommentStatus.REJECT,
    //   },
    // });

    // //all post er total view dekbo
    // //Not a good approach
    // //post er views jodi 5lak or 10 lak hoi tahole onek baje obosta hoye jabe and timeoumt hoye off hoye jabe
    // // const allPosts = await tx.post.findMany();
    // // let totalPostViews = 0;
    // // allPosts.forEach((post) => {
    // //   totalPostViews = totalPostViews + post.views;
    // // });

    // //===good approch==
    // //====totalView ta prisma aggregation er mardome count korb==
    // const totalPostViewsAggregate = await tx.post.aggregate({
    //   _sum: {
    //     views: true,
    //   },
    // });

    // const totalPostViews = totalPostViewsAggregate._sum.views;
    // return {
    //   totalPost,
    //   totlaPublishedPosts,
    //   totalDraftPosts,
    //   totalArchivedPosts,
    //   totalComments,
    //   totalApprovedComments,
    //   totalRejectedComments,
    //   totalPostViews,
    // };

    //✔️✔️Good & clean Approch and Promise er madome kajt ta korbo

    const [
      totalPosts,
      totalPublishedPosts,
      totalDraftPosts,
      totalArchivedPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalPostViewsAggregate,
    ] = await Promise.all([
      await tx.post.count(),
      await tx.post.count({
        where: {
          status: PostStatus.PUBLISHED,
        },
      }),
      await tx.post.count({
        where: {
          status: PostStatus.DRAFT,
        },
      }),
      await tx.post.count({
        where: {
          status: PostStatus.ARCHIVED,
        },
      }),
      await tx.comment.count(),
      await tx.comment.count({
        where: {
          status: CommentStatus.APPROVE,
        },
      }),
      await tx.comment.count({
        where: {
          status: CommentStatus.REJECT,
        },
      }),
      await tx.post.aggregate({
        _sum: {
          views: true,
        },
      }),
    ]);

    return {
      totalPosts,
      totalPublishedPosts,
      totalDraftPosts,
      totalArchivedPosts,
      totalComments,
      totalApprovedComments,
      totalRejectedComments,
      totalPostViews: totalPostViewsAggregate._sum.views,
    };
  });

  return transactionResult;
};

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
