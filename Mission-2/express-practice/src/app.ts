import express, { type Request, type Response } from "express";
import { useRoute } from "./modules/user/user.route";
import { autRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
const app = express();

//middlewear
app.use(express.json());
//logger implement and check request method 
app.use(logger)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Practice",
    author: "Hlw_Sabbir",
  });
});
//user
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);
app.use("/api/user", useRoute);

// jwt implement 
app.use("/api/auth", autRoute)

//server.ts run korar jonno app take export kort hobe
export default app;
