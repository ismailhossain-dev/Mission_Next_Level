import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { ICreateUser } from "./user.interface";

const registerUserIntoDB = async (paylaod: ICreateUser) => {
  const { name, email, password, profilePhoto } = paylaod;
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
      profile: {
        create:{
          profilePhoto
        }
      }
    }, 
  });

  //ei kaj createdUser vitor o kora jai
  //after user created then create profile
  // await prisma.profile.create({
  //   data: {
  //     userId: createdUser.id,
  //     profilePhoto,
  //   },
  // });

  //user get for watch response
  const user = await prisma.user.findUnique({
    where: {
      id: createdUser.id,
      email: createdUser.email,
    },
    //omit use korle password ta resonse e dekabe na
    omit: {
      password: true,
    },
    //include er mardome amra arekta table er morde teke data get korte pari jemon profilePhoto
    include: {
      profile: true,
    },
  });
  return user;
};

// user will be get between token 
const getMyprofileFromDB = async(userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {id: userId},
    omit: {
      password: true //password ta response e dekabe na
    },
    //profile ta get kkorchi
    include: {
      profile: true
    }
  })

  return user
}

export const userService = {
  registerUserIntoDB,
  getMyprofileFromDB
};
