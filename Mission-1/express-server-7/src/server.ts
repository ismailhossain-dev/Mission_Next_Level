import express, {
  type Application,
  type Request,
  type Response,
} from "express";
//postgress import
import { Pool, Result } from "pg";
import config from "./config";
const app: Application = express();
const port = config.port;

app.use(express.json()); //eta use korle amra req.body te kono response pabo na
app.use(express.text()); //text format e data receive korbe
app.use(express.urlencoded({ extended: true })); //nested data receive korbe

//=======postgress work =================
//connect postgress  with neondb
const pool = new Pool({
  connectionString:config.connnection_string
   ,
});

//==========crete neondb database table
//====IF NOT EXISTS mane holo table ekbar create hole er create hobe na validation

/**
 * NOT NULL = required value must be dite hobe
 * VARCHAR(20)=max 20 ta word dite parbe
 * BOOLEAN DEFAULT true=> boolean value set true defult value
 * INT= number type
 * UNIQUE => eta email er morde use korle 1 email diye user 2 bar create hobe na(important)
 * *=All
 */
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        name  VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        )
    `);

  //console kore dektechi daabase create hoitese kina
  console.log("database connectend successfully");
};
initDB();
//=======================
app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!!!!!')
  //Json format data response
  res.status(200).json({
    message: "Express Server",
    author: "Sabbir vai",
  });
});
//User post api

app.post("/api/user", async (req: Request, res: Response) => {
  //   console.log(req.body);
  //==client information gola amra thundar client er mardome ditechi========
  const { name, email, password, age } = req.body; //client teke data nitechi

  //========fist post method========
  //=====$1 $2 kore bole ditechi koita value post hobe neondb agola amra ws school teke kortechi
  //==========RETURNING * eta use hoi response dekanor jonno * use na kore amra bole dite pari kon kon response amra dekte chai like name , email

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password, age], // <--- Ekhane array-te values pass korte hobe
    );
    //console.log("post response", result)//SUCCESSFUL
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

// get all user 
app.get("/api/user", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      ssuccess: true,
      message: "Users retrived successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});

//get one user 
app.get("/api/user/:id", async (req: Request, res: Response) => {
  // get id from client 
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id = $1`, 
      [id]
    );

    // Jodi user na paoa jay
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      });
    }

    // Success response pathano
    return res.status(200).json({
      success: true,
      message: "Single User fetched successfully",
      data: result.rows[0] // Shudhumatrooi single user-er data pathanor jonno
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
});


// update user 
app.put("/api/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password, age } = req.body;

  try {
    // 1. 'await' add kora hoyeche ebong id=$4 kora hoyeche
    /**
     * COALESCE => use korle amr jokon kono kichu update korbo tokon jodi user name dite bule jai  tahole database name ta update hoye null hoye jabe tai amra eta use korchi jeno update na korle same line ei takuk
     * 
     CORLESCE BENIFITES=> holo amra 4ta filed teke spacific 2ta o update korte parbo
     */
const result = await pool.query(
  `UPDATE users SET 
    name = COALESCE($1, name),
    password = COALESCE($2, password), 
    age = COALESCE($3, age),
    is_active = COALESCE($4, is_active)
   WHERE id = $5 
   RETURNING *`, 
  [name, password, age, true, id] // Ekhane 5ta value thakte hobe: $1, $2, $3, $4, ebong $5 (id)
);

    // Jodi user na paoa jay
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found to update!"
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0]
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error
    });
  }
});


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
