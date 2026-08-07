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
 */
const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY, 
        name  VARCHAR(20),
        email VARCHAR(20) NOT NULL,
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

//=======================
app.get("/", (req: Request, res: Response) => {
  // res.send('Hello World!!!!!')
  //Json format data response
  res.status(200).json({
    message: "Express Server",
    author: "Sabbir vai",
  });
});

app.post("/", async (req: Request, res: Response) => {
  //   console.log(req.body);
  const body = req.body; //client teke data nitechi
  res.status(201).json({
    message: "created",
    data: body, //client all data network & terminal e pabo
  });
});

initDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
