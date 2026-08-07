import express, { type Application, type Request, type Response } from "express";
const app:Application = express()
const port = 5000;

app.use(express.json())//eta use korle amra req.body te kono response pabo na

app.get('/', (req: Request, res: Response) => {
  // res.send('Hello World!!!!!')
  //Json format data response
  res.status(200).json({
    "message": "Express Server",
    "author": "Sabbir vai"
  });
});

app.post("/", async(req:Request, res:Response)=> {
  console.log(req.body);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})