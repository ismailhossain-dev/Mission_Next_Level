import express, { type Request, type Response } from "express"
import { useRoute } from "./modules/user/user.route"
const app = express()

//middlewear
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
res.status(200).json({
    message: "Express Practice",
    author: "Hlw_Sabbir"
})
})
// api
app.use("/api/user", useRoute)
app.use("/api/user", useRoute)

//server.ts run korar jonno app take export kort hobe
export default app; 