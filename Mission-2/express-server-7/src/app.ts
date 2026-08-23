import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import config from "./config";
import {  pool } from "./db";
import { useRoute } from "./modules/user/user.route";
import { useRouteProfile } from "./modules/profile/profile.route";
import { jwtRoute } from "./modules/authentication/auth.route";
import fs from "fs"
import cookieParser from "cookie-parser"
import logger from "./authorization/logger";
const app: Application = express();
const port = config.port;
app.use(cookieParser())//eta use korchi auth.controller.ts e cookies er value ta pawer jonno
app.use(express.json()); //eta use korle amra req.body te kono response pabo na
app.use(express.text()); //text format e data receive korbe
app.use(express.urlencoded({ extended: true })); //nested data receive korbe


//======M:9  Express middlewear implement for authorization======
//====== Logger middlewear=======
app.use(logger);

//=======================
app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!!!!!')
  //Json format data response
  res.status(200).json({
    message: "Express Server",
    author: "Sabbir vai",
  });
});

//user jodi app/user request kore take tahole user ke useRouter er vior niye jabe mane meini server ekane and eta holo user.route.ts er viror
//User post api
app.use('/api/user', useRoute)
// get all user 
app.use('/api/user', useRoute)

//get signle user 
app.use("/api/user", useRoute);


// update user 
app.use("/api/user", useRoute);


// delete api created 

app.use("/api/user",useRoute );


// profiles routes 

//post routes 
app.use("/api/profile", useRouteProfile)


// jwt implement

app.use("/api/auth", jwtRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


export default app;


