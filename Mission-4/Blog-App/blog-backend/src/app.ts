import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { userRoutes } from "./modules/users/user.route";
import { authRoutes } from "./modules/auth/auth.route";
const app: Application = express();
app.use(
  cors({
    origin: config.app_url,
    //it will be work in cokkie
    credentials: true,
  }),
);
app.use(express.json());
//This middleware keeps client data in req.body.
app.use(express.urlencoded({ extended: true }));
//This middleware help get cokkie data if we don't use cokkie then token undefind (most imporntat)
app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
export default app;
