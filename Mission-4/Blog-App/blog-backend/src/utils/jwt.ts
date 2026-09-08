//token crate korar somoy dublication gola komabo
import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"
const createToken = (payload:JwtPayload, screct:string, expiresIn:SignOptions)=> {
    const token = jwt.sign(payload, screct, {
        expiresIn 
    } as SignOptions)
    return token;
}


//verify token 

const verifyToken = (token: string , screct: string) => {
   try {
     const verifedToken = jwt.verify(token, screct)
    return verifedToken;
   } catch (error:any) {
    console.log("Token verification failed", error)
    throw new Error(error.message)
   }
}

export const jwtUtils ={
    createToken,
    verifyToken
}