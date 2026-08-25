import type { NextFunction, Request, Response } from "express"

const auth = ()=> {
  return async (req:Request, res:Response, next:NextFunction)=> {
    //ekane postman teke api/user er mardome token ta anbo eta key Authorization and value token ta diye divo and ekane access korbo 
    const token = req.headers.authorization; 
  
  
    next()
  }
}

export default auth; 