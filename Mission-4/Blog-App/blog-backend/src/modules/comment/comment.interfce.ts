import { CommentStatus } from "../../../generated/prisma/enums"

//interface type bole dite hobe model er 
export interface ICreateCommentPayload {
    authorId:string,
    postId:string,
    content:string
} 

export interface IUpdateCommentPayload { 
    content ?: string, 
    status ?: CommentStatus
}
