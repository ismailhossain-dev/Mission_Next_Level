import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePOstPayload {
     title : string; 
    content: string;
    thumbnail? : string;
    isFeatured?: boolean;
    //eta asbe eums teke 
    status? : PostStatus;
    tags? : string[]
   
}