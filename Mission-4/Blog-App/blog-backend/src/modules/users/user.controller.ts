import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catechAsync } from "../../utils/catechAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
//asyc is a req, res function
//catechAsync handle erro response
const registerUser = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User registered successfully",
      data: { user },
    });
  },
);

//// user will be get between token

const getMyprofile = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //eta user.route.ts teke
    // console.log("req.user", req.user)
    //auth.controlle.ts e cokkie set korchi seta ekane access korchi
    // const { accessToken } = req.cookies;
    //token verify & convert decoded
    //error handle korar jonno jwt te verify korechi jwtUtils er morde
    // const verifiedToken = jwtUtils.verifyToken(
    //   accessToken,
    //   config.jwt_access_secret,
    // );
    // //eta use korel verifyToken.id err ta chole jabe
    // if (typeof verifiedToken === "string") {
    //   throw new Error(verifiedToken);
    // }
    const proifle = await userService.getMyprofileFromDB(req.user?.id as string);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile retrived successfully",
      data: proifle,
    });
  },
);


//update my profile 
const updateMyProfile = catechAsync(async (req:Request, res:Response, next:NextFunction)=> {
  //eta middleware/auth.ts teke access korchi
  const id = req.user?.id as string;
  const paylaod = req.body; 
  const updatedProfile = await userService.updateMyProfileInDB(id, paylaod)

  sendResponse(res, {
    statusCode: 200,
    success:true,
    message: "User profile updated successfully",
    data: updatedProfile
  })
})

export const userContoller = {
  registerUser,
  getMyprofile,
  updateMyProfile
};
