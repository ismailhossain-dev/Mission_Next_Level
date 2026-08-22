//M:9, V:2 authorization work etar kaj holo getalluser er api req er response ta just admin dekte pabe
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
const auth = () => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
    // console.log(req.headers) //success
    // console.log(req.headers.authoization)//success
    const token = req.headers.authorization;
    console.log(token);
    //auth folder vitor 3 file mile ekta token korechi seta jodi na take
    //401=unauthorize access
    if (!token) {
     return res.status(401).json({
        success: false,
        message: "Unauthorized access !!",
      });
    }

    //amra jokon post man diye GET:  http://localhost:5000/api/user etate hit korchi and key:Authorization and value: jaigail real token na dile o data ta diye ditese so ekon eta verify korbo

    //encoded token take jwt docs deke decode token kore felsi jemon

    const decoded = jwt.verify(token as string, config.secret as string) as JwtPayload; //jwtPlaylod use nakore docoded.email use korle type error dive

    //console.log("hello docoded", decoded);
    /**
     * hello docoded {id: 8, name: 'ismail bro',is_active: true email: 'ismail@gmail.com',
  iat: 1787393182,
  exp: 1787479582
}
     */


    //amra post man teke check na kore ekon sotari database er sathe match korse kina dekbo decoded ta
    //--ekane just email er mardome ekta user ke find korchi ------
    const userData = await pool.query(
        `
        SELECT * FROM users WHERE email=$1
        `, [decoded.email]
    ) 

   const user = userData.rows[0]
   //console.log("hlw user", user);//successfully
   //validation daone......
   if(userData.rows.length === 0 ){
    res.status(404).json({
      success: false ,
      message: "user not found"
    })
   }

   //is_active jodi false hoi tahole all user data ta pabe na
   //=! eta holo falsi value
   if(!user.is_active) {
    res.status(403).json({
      success: false,
      message: "Forbidden"
    })
   }
    next();
  };
};

export default auth;
