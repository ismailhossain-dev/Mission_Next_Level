import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import config from "./config";
import {  pool } from "./db";
import { useRoute } from "./modules/user/user.route";
const app: Application = express();
const port = config.port;

app.use(express.json()); //eta use korle amra req.body te kono response pabo na
app.use(express.text()); //text format e data receive korbe
app.use(express.urlencoded({ extended: true })); //nested data receive korbe

//=======postgress work =================
//connect postgress  with neondb


//=======================
app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!!!!!')
  //Json format data response
  res.status(200).json({
    message: "Express Server",
    author: "Sabbir vai",
  });
});

//user jodi app/user request kore take tahole user ke useRouter er vior niye jabe mane meini server ekane and eta holo user.route.ts er viror
app.use('/api/users', useRoute)
//User post api



// get all user 
app.use('/api/users', useRoute)

//get signle user 
app.use("/api/user", useRoute);


// update user 
app.use("/api/user", useRoute);


// delete api created 

app.delete("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // 1. [Result] er bodole [id] pass kora holo ebong RETURNING * dewa holo
    const result = await pool.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`, 
      [id]
    );

    // Jodi oi id-er kono user na thake
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


export default app;


