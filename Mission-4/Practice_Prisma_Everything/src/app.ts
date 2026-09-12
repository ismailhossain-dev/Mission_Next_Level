import express, { Request, Response } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import config from "./config";
import { userRoutes } from "./modules/users/user.route";
import { authRoute } from "./modules/auth/auth.route";
const app = express();
app.use(cors({
    origin: config.app_url,
    //It will work for cokkie 
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
//it will work for req.body
app.use(express.urlencoded({extended: true}))

app.get('/', (req:Request, res:Response) => {
  res.status(200).json({
    message: "Hello World!"
  })
});


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoute)

export default app; 