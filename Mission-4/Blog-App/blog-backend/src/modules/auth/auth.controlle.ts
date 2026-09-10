import { NextFunction, Request, Response } from "express";
import { catechAsync } from "../../utils/catechAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
const loginUser = catechAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    //auth.service teke toeken gola destructing kore nitechi
    const {accessToken, refreshToken} = await authService.loginUser(payload);

    //token gola cookie te set korbo jathe user website er browser teke token gola pai
    //jwt-last step

    res.cookie("accessToken",accessToken , {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      //maxAge er ketre mili second te value ta dite 1 day disi
      maxAge:1000 *60 *60 * 24 //1 hour * 24 1 day
    } )

    //set refresh token 
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 *7 //7 days seta takbe cokkie te
    })


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User login successfully",
      data: {
        accessToken,
        refreshToken
      },
    });
  },
);

////refershToker er kaj holo notun kore ekta accessToken create kore user ke diye deowa
const refreshToken = catechAsync(async (req:Request, res:Response, next:NextFunction)=> {
const refreshToken = req.cookies.refreshToken;
//console.log(refreshToken)
//server kichi destructuring korle await use korte hobe
const {accessToken} = await authService.refreshToken(refreshToken)

res.cookie("accessToken", accessToken, {
  httpOnly: true, 
  secure: true,
  sameSite: "none",
  maxAge: 1000 *60 *60 * 24 // 1day
})

sendResponse(res, {
  success: true,
  statusCode: httpStatus.OK,
  message: "Token refreshed successfully",
  data: {accessToken}
})
})

export const authController = {
  loginUser,

  refreshToken
};
