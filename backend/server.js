import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import itemRouter from './routes/itemRoutes.js'

const app= express()

await connectDB()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get("/", (req,res)=>{
    res.send("API is working!")
})
app.use("/api/admin", adminRouter)
app.use("/api/item", itemRouter)

const PORT= process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

export default app;