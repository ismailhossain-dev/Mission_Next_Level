import express, { type Request, type Response } from "express"
const app = express()

//middlewear
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
res.status(200).json({
    message: "Express Practice",
    author: "Hlw_Sabbir"
})
})


//server.ts run korar jonno app take export kort hobe
export default app; 