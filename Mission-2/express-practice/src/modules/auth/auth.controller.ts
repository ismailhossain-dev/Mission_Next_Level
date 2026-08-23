import type { Request, Response } from "express";
import { authService } from "./auth.service";

//create jwt token
const loginUser = async(req:Request, res:Response)=> {
    try {
        const result = await authService.loginUserIntoDB(req.body)
        res.status(200).json({
            success: true, 
            message: "User login successfully for jwt",
            data:result //ekane token ta pabo
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            mesage:error.message,
            error: error.mesage
        })
        
    }
}

export const authController = {
    loginUser
}