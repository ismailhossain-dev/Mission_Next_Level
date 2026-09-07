import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
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
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World",
  });
});
export default app;
