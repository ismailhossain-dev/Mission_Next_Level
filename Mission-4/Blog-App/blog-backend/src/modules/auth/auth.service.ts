import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  console.log(email, password)
  //steo-1: user isExist in db
  const user = await prisma.user.findFirstOrThrow({
    where: { email },
  });
  //==!user eta use kora lagbe na findFirstOrThrow automatic ei kaj ta kore felbe
  //  if(!user){
  //     throw new Error("User not found")
  //  }

  const isPasswordMatched = await bcrypt.compare(password, user.password)

  if(!isPasswordMatched) {
    throw new Error("Password is incorrect")
  }
  return user;
};
export const authService = {
  loginUser,
};
