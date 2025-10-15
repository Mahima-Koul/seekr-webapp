const express= require("express");
const app= express()
const mongoose= require("mongoose")

app.listen(8080,()=>{
    console.log("Server is listening at Port 8080")
})

app.get("/", (req,res)=>{
    res.send("Hello i am root")
})