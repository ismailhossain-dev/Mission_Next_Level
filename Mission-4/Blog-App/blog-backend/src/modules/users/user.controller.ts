import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catechAsync } from "../../utils/catechAsync";
import { sendResponse } from "../../utils/sendResponse";
import jwt from "jsonwebtoken";
import config from "../../config";
import { jwtUtils } from "../../utils/jwt";
//asyc is a req, res function
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
    //auth.controlle.ts e cokkie set korchi seta ekane access korbo
    const { accessToken } = req.cookies;
    //token verify & convert decoded
    //error handle korar jonno jwt te verify korechi jwtUtils er morde
    const verifiedToken = jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret,
    );
    //eta use korel verifyToken.id err ta chole jabe
    if (typeof verifiedToken === "string") {
      throw new Error(verifiedToken);
    }
    const proifle = await userService.getMyprofileFromDB(verifiedToken.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile retrived successfully",
      data: proifle,
    });
  },
);

export const userContoller = {
  registerUser,
  getMyprofile,
};
