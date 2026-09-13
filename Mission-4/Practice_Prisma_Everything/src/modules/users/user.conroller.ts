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

const getMyProfile  = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
        const result = await userService.getMyprofileFromDB(req.user?.id as string)

        sendResponse(res,{
            success: true, 
            statusCode: htttpStatus.OK,
            message: "User profie retrived successfully",
            data: result
        })

})

const updateMyPRofile = catchAsync(async(req:Request, res:Response,next:NextFunction)=> {
    const userId = req.user?.id as string;
    const payload = req.body;
    const result = await userService.updateMyProfileInDB (userId , payload)

    sendResponse(res, {
        success: true,
        statusCode: htttpStatus.OK,
        message: "User prifle updated successfully",
        data: result
    })
})

export const userController ={
    regiterUser,
    getMyProfile,
    updateMyPRofile
}