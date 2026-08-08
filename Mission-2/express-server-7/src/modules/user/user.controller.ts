// ekane request and response ta handle korbo

import type { Request, Response } from "express";
import { pool } from "../../db";
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


// ekan teke onek object export hobe tai etake object akare ditechi

export const userController = {
    createUser
}