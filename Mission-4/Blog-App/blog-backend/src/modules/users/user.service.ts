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
        create: {
          profilePhoto,
        },
      },
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
const getMyprofileFromDB = async (userId: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    omit: {
      password: true, //password ta response e dekabe na
    },
    //profile ta get kkorchi
    include: {
      profile: true,
    },
  });

  return user;
};

//update my profile
//user teke 2ta information nivo 1.userId 2.payload mane se ki update korte chai

const updateMyProfileInDB = async (userId: string, paylaod: any) => {
  //name , email for user and  profilePhoto, bio for profile
  const { name, email, profilePhoto, bio } = paylaod;
  //user ta ache kina eta check kore middleware/auth.ts a
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      email,

      profile: {
        update: {
          profilePhoto,
          bio,
        },
      },
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  return updatedUser;
};

export const userService = {
  registerUserIntoDB,
  getMyprofileFromDB,
  updateMyProfileInDB,
};
