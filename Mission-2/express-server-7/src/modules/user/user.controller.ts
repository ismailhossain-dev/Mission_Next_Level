// ekane request and response ta handle korbo

import type { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
//   const { name, email, password, age } = req.body;

try {
    //ei function er kaj ta amra user.service.ts file e korchi
   const result = await userService.createUserIntoDB(req.body)
  
    res.status(201).json({
        ssuccess: true,
      message: "created",
      //rows error ta solve korar jonno just amra user.service.ts return result kore disi
      data: result.rows[0], //main response
    });
  } catch (error: any) {
    res.status(500).json({
        ssuccess: false,
      message: error.message,
      error: error,
    });
  }
}

//getAlluser response
const getAllUsers = (async (req: Request, res: Response) => {
  try {
   const result = await userService.getAllUsersFromDB(req.body)
     res.status(200).json({
      ssuccess: true,
      message: "Users retrived successfully",
      data: result.rows,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
})
 
// get singleUser

const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID",
        });
    }

    try {
        const result = await userService.getSingleUser(id);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Single User fetched successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
};