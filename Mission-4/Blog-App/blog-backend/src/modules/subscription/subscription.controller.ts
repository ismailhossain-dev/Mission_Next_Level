import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { subscriptionServices } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";
import htttpStatus from "http-status"
const createCheckOutSession = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const userId = req.user?.id;
    const result = await subscriptionServices.createCheckOutSession(userId as string)
    sendResponse(res, {
        success: true,
        statusCode:htttpStatus.OK,
        message: "Checkout completed successfully",
        data: result
    })

})

const hanldeWebhook = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {

})
export const subscriptionController = {
    createCheckOutSession,
    hanldeWebhook
}