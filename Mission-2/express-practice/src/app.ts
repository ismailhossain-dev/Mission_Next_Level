import express, { type Request, type Response } from "express"
const app = express()

//middlewear
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})


//server.ts run korar jonno app take export kort hobe
export default app; 