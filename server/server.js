import express from "express"
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from "./inngest/index.js"
import { serve } from "inngest/express";

const app = express()
const port = 4000;

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

await connectDB()

app.get("/" , (req,res)=>{
    res.send("server is live")
})
app.use("/api/inngest", serve({ client: inngest, functions }));


app.listen(port , ()=>{
    console.log(`server listening at http://localhost:${port}`)
}
)