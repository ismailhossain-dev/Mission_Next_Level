import type { NextFunction, Request, Response } from "express";
//eta use korle amara dekono error he sundor vabe dekte pabo organized vabe and eta sob error er jonno kaj korbe
const globallErrorHandler = (err:any, req:Request, res:Response, next:NextFunction) => {
  //console.error(err.stack); // Log the error

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}

export default globallErrorHandler;