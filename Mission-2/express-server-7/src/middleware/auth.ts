//M:9, V:2 authorization work etar kaj holo getalluser er api req er response ta just admin dekte pabe
import type { NextFunction, Request, Response } from "express";

const auth = (req:Request, res:Response, next:NextFunction)=> {
    // console.log(req.headers) //success
    // console.log(req.headers.authoization)//success
    const token = req.headers.authorization; 


    //auth folder vitor 3 file mile ekta token korechi seta jodi na take
    //401=unauthorize access
    if(!token){
        res.status(401).json({
            success: false, 
            message: "Unauthorized access !!"
        })
    }

    next()
}

export default auth; 