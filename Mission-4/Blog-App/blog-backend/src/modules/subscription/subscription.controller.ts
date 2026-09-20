import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { subscriptionServices } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";
import htttpStatus from "http-status"
const createCheckOutSession = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const userId = req.user?.id;
    const result = await subscriptionServices.createCheckoutSession(userId as string)
    sendResponse(res, {
        success: true,
        statusCode:htttpStatus.OK,
        message: "Checkout completed successfully",
        data: result
    })

})

//paymet info store in db
const hanldeWebhook = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
    const event = req.body as Buffer;
    const signature = req.headers['stripe-signature']


 await  subscriptionServices.handleWebhook(event, signature as string)
    sendResponse(res, {
        success: true,
        statusCode:200,
        message:"webhook triggered successfully",
        data: null
    })
})
export const subscriptionController = {
    createCheckOutSession,
    hanldeWebhook
}