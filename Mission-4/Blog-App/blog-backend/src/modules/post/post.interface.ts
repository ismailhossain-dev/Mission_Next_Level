import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";

export interface ICreatePostPayload {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  isPremium? :boolean;
  //eta asbe eums teke
  status?: PostStatus;
  tags: string[];
}

export interface IUpdatePostPayload {
  title?: string;
  content?: string;
  thumbnail?: string;
  //eta korte parbe admin but learing ketre author and user o korte parbe
  isFeatured?: boolean;
  status?: PostStatus;
  tags?: string[];
}

//postWhereInput ta asbe prisma generated teke and eta user korle amra post model sob kichu pabo and interface er moder er define korte hobe na
export interface IPostquery extends PostWhereInput {
  //post model or fileds
  // title?: string;
  // content?: string;
  searchTerm?: string;

  //post man e number o string hoye jabe
  page?: string;
  limit?: string;
  sortOrder?: string;
  sortBy?: string;
}
