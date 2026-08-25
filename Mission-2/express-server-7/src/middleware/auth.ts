import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { ROLES } from "../types";

const auth = (...roles:ROLES[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
   try {
     /**
     * What i doing here 
     * 1.check if the token exists
     * 2.verify the token
     * 3.find the user into database 
     * 4.is the user active or not 
     */

  
    console.log(roles)
    //ekane postman teke api/user er mardome token ta anbo eta key Authorization and value token ta diye divo and ekane access korbo
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unautorized access!!",
      });
    }

    //user jathe fake token diye data dekte na pare validation korchi
    //human readable hower jono ecoded teke decoded e convert korchi
    const decoded = jwt.verify(
      token as string,
      config.secret as string,
    ) as JwtPayload;
    //as jwtpayload use korle docoded.email use korle error dibe na

    //ekane amra auth.service.ts er jwtPayload ta pabo
    //console.log(decoded)

    const userData = await pool.query(
      `
      SELECT * FROM users WHERE email=$1
      `,
      [decoded.email],
    );
    // console.log("Decoded email:", decoded.email);
    // console.log("UserData:", userData.rows);
    // console.log("Rows length:", userData.rows.length);

    const user = userData.rows[0];
    // console.log(user)
    //console.log(user)
    //এই condition:তখনই কাজ করবে যখন database query কোনো user খুঁজে পাবে না।
    if (userData.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }


    //user er is_acitve flase kore dile o user data dekte pabe na
   console.log(user)// ekane check korbo databse is_active false hoitese kina
    if(!user?.is_active ) {
      return res.status(403).json({
        success: false,
        message: "Is_Active false and Forbidden!!"
      })
    }//succesfully validation complete
    console.log(user.role)

   //admin and agent chara user route er kew access korte parbe na
    //includes diye array method check kore
    //roles.length =>role takle lenth takbe
    if(roles.length && !roles.includes(user.role)){
      return res.status(403).json({
        success:false,
        message: "Forbidden and not match role"
      })
    }

    // 4ta step par korar por user take req er morde set kore divo req console korle ekta user name e object pabo and user.route.ts eekane ei route kaj korche and response ta user.controller.ts korchi so ekane jodi req ta console kori tahole user dekte pabo
    req.user = decoded; 

    //console.log(req)
    next();

   } catch (error) {
    //next function tar morde error ta set kore disi 
    next(error)
   }
  };
};

export default auth;
