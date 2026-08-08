import { Router, type Request, type Response } from "express";
import { pool } from "../../db";

const router = Router()

// app route 

//eta holo apoi/user so ekane amra ekta / disi because amra app.ts ser korchi app.user('/api/user') er viro
router.post("/", async (req: Request, res: Response) => {
  const { name, email, password, age } = req.body;

  //========fist post method========
  //=====$1 $2 kore bole ditechi koita value post hobe neondb agola amra ws school teke kortechi
  //==========RETURNING * eta use hoi response dekanor jonno * use na kore amra bole dite pari kon kon response amra dekte chai like name , email

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, age], 
    );
  
    res.status(201).json({
        ssuccess: true,
      message: "created",
      data: result.rows[0], //main response
    });
  } catch (error: any) {
    res.status(500).json({
        ssuccess: false,
      message: error.message,
      error: error,
    });
  }
});

// export kora holo
export const useRoute = router