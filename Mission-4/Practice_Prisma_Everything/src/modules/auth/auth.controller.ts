import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const {accessToken, refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite:"none",
        maxAge:1000 * 60 * 60 * 24 //1day
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 //7 day
    })
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login in successfully",
      data: {
        accessToken,
        refreshToken
      },
    });
  },
);

// const refreshToken = catchAsync(async(req:Request, res:Response, next:NextFunction)=> {
//     const result = await authService.refreshToken(req.body);

//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.OK,
//         message: "Token refreshed successfully",
//         data: result
//     })
// })

export const authController = {
  loginUser
//   refreshToken,
};
