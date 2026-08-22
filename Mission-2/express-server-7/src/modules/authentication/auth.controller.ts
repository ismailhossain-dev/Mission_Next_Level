//authentication jwt-2 create a function & handle req , res

import type { Request, Response } from "express"
import { authService } from "./auth.service"

const loginUser =  async (req:Request, res:Response)=> {

    try {
        const result = await authService.loginUserIntoDB(req.body)
        res.status(201).json({
            success: false,
            message: "jwt retrive successfully",
            data: result
        })
        
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


export const authController = {
    loginUser
}