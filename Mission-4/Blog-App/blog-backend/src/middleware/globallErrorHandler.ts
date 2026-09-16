//specially req, res function for express
//this middeware handle full application error globall error handler
//next function catchAsync er next ta receive korche
//1 email diye 2 bar register korle error ta dekte pabo etc
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

export const globallErrorHanlder = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  //if calient valide error
  //M:23 V:8
  console.log("Error : ", err);
  let statusCode;
  let errorMessage = err.message || "Internal Server Error";

  let errorName = err.name || "Internal Server Error";
  //let errorDetails = err.stack;

  if (err instanceof Prisma.PrismaClientValidationError) {
    const statusCode = httpStatus.BAD_REQUEST;
    const errorMessage =
      "You have provided incorrect filed tpe or missing fields";
  }else if (err instanceof Prisma.PrismaClientKnownRequestError){
    if(err.code === "p2002"){
        statusCode = httpStatus.BAD_REQUEST,
        errorMessage = "Dublicate Key Error"
    }
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
    name: errorName,
    message: errorMessage,
    //stack => err body
    error: err.stack,
  });
};
