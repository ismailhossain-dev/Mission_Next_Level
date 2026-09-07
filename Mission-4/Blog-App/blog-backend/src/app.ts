import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import { prisma } from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
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
//This middleware helps keep data in cokkie
app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
  // const user = await prisma.user.findMany();
  // console.log(user)
  res.send("Hello World!");
});

app.post("/api/users/register", async (req: Request, res: Response) => {
  const { name, email, password, profilePhoto } = req.body;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isUserExist) {
    throw new Error("User with this email already exists");
  }
  //env ta amra jai raki sob gola string hoye jai tai Number e covert korchi
  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  //createdUser ta varible rekechi becuase amader user.id ta profile dorkar hobe
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  //after user created then create profile
  await prisma.profile.create({
    data: {
      userId: createdUser.id,
      profilePhoto,
    },
  });

  const user =await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email
    }
  })

  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode : httpStatus.CREATED,
    message: "User registred successfully",
    data: user
  });
});
export default app;
