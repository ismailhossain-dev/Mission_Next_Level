import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import { userService } from "./user.service";
import { catechAsync } from "../../utils/catechAsync";


// const createUser = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const user = await userService.createUserIntoDB(payload);
//     res.status(httpStatus.CREATED).json({
//       success: true,
//       statusCode: httpStatus.CREATED,
//       message: "User registred successfully",
//       data: user,
//     });
//   } catch (error:any) {
//     console.log(error);
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//         success: false,
//         statusCode:httpStatus.INTERNAL_SERVER_ERROR,
//         message: "Failed to register user",
//         error:(error as Error).message
//     })
//   }
// };

//asyc is a req, res function
const registerUser = catechAsync(async (req:Request, res:Response, next:NextFunction)=> {
  const payload = req.body; 
  const user = await userService.registerUserIntoDB(payload)
  res.status(httpStatus.CREATED).json({
     success: true,
      statusCode: httpStatus.CREATED,
      message: "User registred successfully",
      data: {user},
  })
})
export const userContoller = {
  registerUser,
};
