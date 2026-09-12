import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
    title : string; 
    content: string;
    thumbnail? : string;
    isFeatured?: boolean;
    //eta asbe eums teke 
    status? : PostStatus;
    tags : string[]
}

export interface IUpdatePostPayload {
    title?: string;
    content?:string;
    thumbnail?: string;
    //eta korte parbe admin but learing ketre author and user o korte parbe
    isFeatured?: boolean;
    status?: PostStatus;
    tags?: string[]
}