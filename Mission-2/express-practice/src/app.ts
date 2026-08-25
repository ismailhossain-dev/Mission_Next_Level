import express, { type Request, type Response } from "express";
import { useRoute } from "./modules/user/user.route";
import { autRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import cookieParser from "cookie-parser"
const app = express();

//middlewear
app.use(express.json());
//logger implement and check request method 
app.use(logger)
app.use(cookieParser())//used for set cokkies data

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Practice",
    author: "Hlw_Sabbir",
  });
});
//user
app.use("/api/user", useRoute);
//get all users
app.use("/api/users", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);

// jwt implement 
app.use("/api/auth", autRoute)

//server.ts run korar jonno app take export kort hobe
export default app;
