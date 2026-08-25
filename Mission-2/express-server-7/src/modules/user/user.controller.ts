import type { Request, Response } from "express";
import { userService } from "./user.service";


const createUser = async (req: Request, res: Response) => {
//   const { name, email, password, age } = req.body;


try {
   const result = await userService.createUserIntoDB(req.body)
  
    res.status(201).json({
        ssuccess: true,
      message: " User Created Successfully",
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

    //eta holo authorization/auth.ts req.user = decoded; ei value ta
    // console.log("controller authorization data", req.user)
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


//update user response 

const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, password, age } = req.body;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID",
        });
    }

    try {
        const result = await userService.updateUserIntoDB(
            id,
            name,
            password,
            age
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found to update!",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
};


//user delete user response

const deleteUser = async (req: Request, res: Response) => {
      const { id } = req.params;

    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID",
        });
    }
  try {
 const result = await userService.deleteUserIntoDB(id);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found to delete!"
      });
    }

    // 2. Success-e 'success: true' kora holo
    return res.status(200).json({
      success: true,
      message: "User deleted successfully!!",
      data: result.rows[0] // Konti delete holo tar info
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
}
export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};