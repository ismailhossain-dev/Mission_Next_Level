import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catechAsync } from "../../utils/catechAsync";
import { sendResponse } from "../../utils/sendResponse";

//asyc is a req, res function
const registerUser = catechAsync(async (req:Request, res:Response, next:NextFunction)=> {
  const payload = req.body; 
  const user = await userService.registerUserIntoDB(payload)

  sendResponse(res, {
    success:true,
    statusCode:httpStatus.CREATED,
    message:"User registered successfully",
    data: {user}
  })
})



//// user will be get between token 

const getMyprofile = ()=> {}
export const userContoller = {
  registerUser,
  getMyprofile
};
