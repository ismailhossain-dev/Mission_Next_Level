import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserFromDB(req.body);
    res.status(200).json({
      success: true,
      message: "User Get successfully!!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    const result = await userService.getSingleUserIntoDB(id);

    res.status(200).json({
      success: true,
      message: "Single user get successfully!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User ID",
    });
  }

  try {
    const result = await userService.updateUserIntoDB(id, name, password);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User not found update!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated success!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

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

    res.status(200).json({
      success: true,
      message: "User delete successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
