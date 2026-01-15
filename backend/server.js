import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js'
import authRouter from './routes/authRoutes.js'
import itemRouter from './routes/itemRoutes.js'
import auth from './middleware/auth.js' 
import { protect } from "./middleware/auth.js";
import claimRouter from './routes/claimRoutes.js'
import notificationRouter from "./routes/notifications.js";

const app= express()

await connectDB()

//Middlewares
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json())

//Routes
app.get("/", (req,res)=>{
    res.send("API is working!")
})


app.get("/api/protected-test", protect, (req, res) => {
  res.json({
    success: true,
    message: "You are authorized",
    user: req.user
  });
});

app.use("/api/auth", authRouter)
app.use("/api/item", itemRouter)
app.use("/api/claim", claimRouter);
app.use("/api/notifications", notificationRouter);

const PORT= process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

export default app;