import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import {
  ICreatePostPayload,
  IPostquery,
  IUpdatePostPayload,
} from "./post.interface";

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return result;
};

const getAllPosts = async (query: IPostquery) => {
  //default 10 kore data asbe condition match na korle
  const limit = query.limit ? Number(query.limit) : 10;
  const page = query.page ? Number(query.page) : 1;
  //sorting
  const sortBy = query.sortBy ? query.sortBy : "createAt";
  const sortOrder = query.sortOrder ? query.sortOrder: "desc"
  //culcolate skip
  const skip = (page - 1) * limit;
  const posts = await prisma.post.findMany({
    // ============================================================
    // Filtering / Exact Match
    // ============================================================

    // 100% exact match করা যায় AND operator ছাড়াই.
    // একাধিক field দিলে সব condition match করতে হবে.

    // where: {
    //   title: "My five Post",
    //   content: "Ronaldo",
    // },

    // ============================================================
    // Filtering / Exact Match with AND Operator
    // ============================================================

    // AND operator ব্যবহার করে একাধিক exact condition দেওয়া যায়.
    // প্রতিটি condition 100% match করতে হবে.

    // where: {
    //   AND: [
    //     {
    //       title: "My five Post",
    //     },
    //     {
    //       content: "Ronaldo",
    //     },
    //     {
    //       tags: {
    //         equals: ["typescript, prisma, express"],
    //       },
    //     },
    //   ],
    // },

    // ============================================================
    // Searching / Partial Match
    // ============================================================

    // Partial match মানে পুরো word বা sentence 100% match না করলেও,
    // word-এর কিছু অংশ match করলে data পাওয়া যাবে.

    // contains → কোনো word/character-এর অংশ match করে.

    // mode: "insensitive"
    // → uppercase বা lowercase যেভাবেই search করা হোক,
    // data পাওয়া যাবে.

    // where: {
    //   title: {
    //     contains: "Ronaldo",
    //     mode: "insensitive",
    //   },
    //   content: {
    //     contains: "ronaldo",
    //     mode: "insensitive",
    //   },
    // },

    // ============================================================
    // Searching / Partial Match with OR Operator
    // ============================================================

    // OR operator ব্যবহার করলে title অথবা content-এর যেকোনো একটিতে
    // search word match করলেই data পাওয়া যাবে.

    // যেখানে title অথবা content-এর মধ্যে "Ronaldo" থাকলেই result আসবে.

    // where: {
    //   OR: [
    //     {
    //       title: {
    //         contains: "Ronaldo",
    //         mode: "insensitive",
    //       },
    //     },
    //     {
    //       content: {
    //         contains: "Ronaldo",
    //         mode: "insensitive",
    //       },
    //     },
    //   ],
    // },

    // ============================================================
    // Combining Search (OR) + Filtering (AND)
    // ============================================================

    // এখানে Search এবং Filtering একসাথে ব্যবহার করা হয়েছে.
    //
    // Search:
    // → title অথবা content-এর মধ্যে "Ron" থাকলে match করবে.
    //
    // Filtering:
    // → title এবং content-এর exact match হতে হবে.
    //
    // অর্থাৎ:
    // 1. title অথবা content-এ "Ron" থাকতে হবে.
    // 2. title = "Ronaldo Nazario" হতে হবে.
    // 3. content = "Ronaldo" হতে হবে.

    // where: {
    //   AND: [
    //     {
    //       OR: [
    //         {
    //           title: {
    //             contains: "Ron",
    //             mode: "insensitive",
    //           },
    //         },
    //         {
    //           content: {
    //             contains: "Ron",
    //             mode: "insensitive",
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       title: "Ronaldo Nazario",
    //     },
    //     {
    //       content: "Ronaldo",
    //     },
    //   ],
    // },

    // ============================================================
    // Pagination
    // ============================================================

    // Pagination মানে হলো data-কে একসাথে সব না দেখিয়ে,
    // page অনুযায়ী ভাগ করে দেখানো.
    //
    // take → প্রতি page-এ কয়টি data দেখাবো.
    // skip → কতগুলো data বাদ দিয়ে শুরু করবো.
    //
    // Example:
    //
    // Page 1:
    // take: 2
    // skip: 0
    //
    // Page 2:
    // take: 2
    // skip: 2
    //
    // Page 3:
    // take: 2
    // skip: 4

    // ============================================================
    // Pagination Formula
    // ============================================================

    // Formula:
    // skip = (page - 1) * limit
    //
    // Example:
    // page = 4
    // limit = 1
    //
    // skip = (4 - 1) * 1
    //      = 3
    //
    // অর্থাৎ 3টি data skip করে 4th page-এর data দেখাবে.
    //
    //
    // Another Example:
    //
    // page = 3
    // limit = 10
    //
    // skip = (3 - 1) * 10
    //      = 20
    //
    // অর্থাৎ প্রথম 20টি data skip করে,
    // 3rd page-এ পরের 10টি data দেখাবে.
    //
    //
    // Example code:
    //
    // const page = 3;
    // const limit = 10;
    //
    // const result = await prisma.post.findMany({
    //   take: limit,
    //   skip: (page - 1) * limit,
    // });

    // ============================================================
    // Sorting
    // ============================================================

    // orderBy ব্যবহার করে data ascending বা descending order-এ সাজানো যায়.
    //
    // asc  → ছোট থেকে বড় / A থেকে Z
    // desc → বড় থেকে ছোট / Z থেকে A
    //
    // Example:

    // orderBy: {
    //   createAt: "desc",
    // },

    // ============================================================
    // Sorting by Multiple Fields
    // ============================================================

    // একই value বা একই সময়ের একাধিক data থাকলে,
    // multiple field দিয়ে sorting করা যায়.
    //
    // প্রথম field অনুযায়ী sorting হবে.
    // তারপর একই value হলে পরের field দিয়ে sorting হবে.

    // orderBy: [
    //   {
    //     createAt: "desc",
    //   },
    //   {
    //     title: "asc",
    //   },
    //   {
    //     content: "desc",
    //   },
    // ],

    // ============================================================
    // Dynamic Sorting
    // ============================================================

    // User-এর কাছ থেকে জিজ্ঞেস করা যায়:
    // → কোন field দিয়ে sorting করতে চায়?
    // → Ascending নাকি Descending order চায়?
    //
    // তারপর সেই অনুযায়ী orderBy-এর value দেওয়া যায়.

    //.........Dynamic Pagination & Fitering & Searching..........

    where: {
      AND: [
        query.searchTerm
          ? {
              OR: [
                {
                  title: {
                    contains: query.searchTerm,
                    mode: "insensitive",
                  },
                },
                {
                  content: {
                    contains: query.searchTerm,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {},
      ],
    },

    //limit 10 kore
    take: limit,
    skip: skip,

    //sorting....
    orderBy: {
      [sortBy]: sortOrder
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
