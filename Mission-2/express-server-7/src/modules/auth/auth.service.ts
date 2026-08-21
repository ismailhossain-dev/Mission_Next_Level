import { pool } from "../../db";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
    const {email , password} = payload; 
    //1.Cheek the if user exist amra email take db teke find korchi
    const userData = await pool.query(`
        SELECT * FROM users WHERE email =$1  
        `,[email])

    const user = userData.rows[0]

    console.log("jwt user " , user)
    //2.Compere password 
    //3.Generate Token

};



export const authService = {
  loginUserIntoDB,
};
