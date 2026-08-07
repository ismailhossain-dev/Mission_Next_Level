import express, { type Application, type Request, type Response } from "express";
//postgress import 
import {Pool} from "pg";
const app:Application = express()
const port = 5000;

app.use(express.json())//eta use korle amra req.body te kono response pabo na
app.use(express.text())//text format e data receive korbe
app.use(express.urlencoded({ extended: true }));//nested data receive korbe

//=======postgress work =================
//connect postgress  with neondb
const pool = new Pool ({
    connectionString: "postgresql://neondb_owner:npg_IrSvam3zCQ7b@ep-late-river-aybjustn-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})

//=======================
app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!!!!!')
  //Json format data response
  res.status(200).json({
    "message": "Express Server",
    "author": "Sabbir vai"
  });
});

app.post("/", async(req:Request, res:Response)=> {
//   console.log(req.body);
const body = req.body; //client teke data nitechi
res.status(201).json({
    message: "created",
    data: body//client all data network & terminal e pabo
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})