import type { NextFunction, Request, Response } from "express"
import fs from "fs"

const logger = (req:Request, res:Response, next:NextFunction)=> {
    const log = `\n Method ---> ${req.method} --> Time ${Date.now()} --> URL--->${req.url} \n `
  fs.appendFile("logger.text", log , (err)=> {
    //null console dekanor jonno err ta off karchi
  })
  next()
}

export default logger