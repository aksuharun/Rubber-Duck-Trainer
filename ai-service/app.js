import express from "express"
import gptRouter from "./gpt/routes.js"

const app = express()

app.use(express.json())
app.use("/gpt", gptRouter)

export default app