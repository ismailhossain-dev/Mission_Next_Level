
import { NextFunction, Request, Response } from "express";
import { catechAsync } from "../../utils/catechAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
const loginUser = catechAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const payload = req.body;
    const loginResult = await authService.loginUser(payload)
    sendResponse(res, {
        success:true,
        statusCode: httpStatus.OK,
        message: "User login successfully",
        data: {loginResult}
        
    })
}) 


export const authController = {
    loginUser
}