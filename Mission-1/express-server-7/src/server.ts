import express, {
  type Application,
  type Request,
  type Response,
} from "express";
//postgress import
import { Pool } from "pg";
const app: Application = express();
const port = 5000;

app.use(express.json()); //eta use korle amra req.body te kono response pabo na
app.use(express.text()); //text format e data receive korbe
app.use(express.urlencoded({ extended: true })); //nested data receive korbe

//=======postgress work =================
//connect postgress  with neondb
const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_IrSvam3zCQ7b@ep-late-river-aybjustn-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
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

// User Retrive api
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
