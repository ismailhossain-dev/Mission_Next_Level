import config from "../../config";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { IuserPayload } from "./user.interface";

const regiterUserInDB = async (payload: IuserPayload) => {
  const { name, email, password, profilePhoto } = payload;
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

    if (isUserExist) {
    throw new Error("User with this email already exists");
  }

  const hashPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      profile: {
        create: {
          profilePhoto,
        },
      },
    },
  });

  //user get for response

  const user = await prisma.user.findUnique({
    where: {
      id: createUser.id,
      email: createUser.email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return user;
};

export const userService = {
  regiterUserInDB,
};
