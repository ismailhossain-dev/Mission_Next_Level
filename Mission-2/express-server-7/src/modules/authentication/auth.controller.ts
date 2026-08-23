//authentication jwt-2 create a function & handle req , res
//http://localhost:5000/api/auth/login->post
import type { Request, Response } from "express";
import { authService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUserIntoDB(req.body);
    //=====refresh token response M:9 V:6 next level verify=========
    //refreshToken= ei name e browser cokkie te refresh token ta save hobe
    const {refreshToken} = result; 
    res.cookie("refreshToken", refreshToken, {
        secure: false, //eta production deploy e true kore divo
        httpOnly: true, //brower cokkies ta amra js diye access korte pari na tai httponly tru kore dile tokon ni access korte pari
        sameSite: "lax"//eta use korle method bole dite parbo get, sathe naki post er sathe kaj korbe
    });
    //=============
    res.status(201).json({
      success: false,
      message: "jwt login successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};


//refresh token function etar mardome cokkies teke access-token ta niye asobo 

const refreshToken = async(req:Request, res:Response)=> {
  //cokkies er value pawer jonno app.ts npm i cookie-parser eta install korte hobe
    console.log("refresh cokkie console auth.controller.ts", req.cookies)
}
export const authController = {
  loginUser,
  refreshToken
};
