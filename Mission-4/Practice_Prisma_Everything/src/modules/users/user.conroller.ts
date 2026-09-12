import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { userService } from "./user.service"
import { sendResponse } from "../../utils/sendResponse";
import htttpStatus from "http-status";
const regiterUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const result = await userService.regiterUserInDB(req.body);

    sendResponse(res, {
        success: true,
        statusCode:htttpStatus.CREATED,
        message: "User Created Successfully",
        data: result
    })
})


export const userController ={
    regiterUser
}