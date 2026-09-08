//token crate korar somoy dublication gola komabo
import { JwtPayload, SignOptions } from "jsonwebtoken"
import jwt from "jsonwebtoken"
const createToken = (payload:JwtPayload, screct:string, expiresIn:SignOptions)=> {
    const token = jwt.sign(payload, screct, {
        expiresIn 
    } as SignOptions)
    return token;
}

export const jwtUtils ={
    createToken
}