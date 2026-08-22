//authorization work M:9, V:1, 2 ei file tar main purpose holo client jokon http:localhost:5000 kono express server e request patabe seta get , post , delete, update jei method e request korok na kno seta logger.text er vitor dekte pabo history hisabe
import type { NextFunction, Request, Response } from "express";
import fs from "fs"

const logger = (req:Request, res:Response, next:NextFunction) => {
//   console.log('Method - URL - Time:', Date.now());
  const  log = `\n Method --> ${req.method} --> Time ${Date.now()} --> URL --> ${req.url} \n`
  fs.appendFile("logger.text", log , (err)=> {
    // console.log(err) //eta lagbe na karone eta error na pawer karone bar bar console null ditese
  })
  next(); //eta use na korle server load hobe na just loading nive
}

export default logger