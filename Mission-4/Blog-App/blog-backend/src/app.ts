import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
const app: Application = express();
app.use(cors({
  origin:config.app_url,
  //it will be work in cokkie 
  credentials:true
}));
app.use(express.json());
//This middleware keeps client data in req.body.
app.use(express.urlencoded({extended: true}))
//This middleware helps keep data in cokkie
app.use(cookieParser())
app.get('/', async(req:Request, res:Response) => {
  // const user = await prisma.user.findMany();
  // console.log(user)
  res.send('Hello World!');
});
export default app;
