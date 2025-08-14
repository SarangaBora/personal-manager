// const express= require('express')
import express from 'express'
import { connectDB } from './config/mongodb.js'
import userRouter from './routers/userRoute.js'
import { configDotenv } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
//always required
configDotenv()
const app = express() //starting point 

//basic get req
app.get("/",(req,res)=>{
    res.send("Server is ready")
})


app.use(express.json())
app.use(cookieParser())
// const cors = require("cors")

const FEnd_PORT=process.env.FEnd_PORT || 5173
app.use(cors({
  origin: `http://localhost:${FEnd_PORT}`, // frontend URL
  credentials: true
}));


app.use('/users',userRouter)




//engine
const PORT=process.env.PORT || 5000 //default to 5000
app.listen(PORT,()=>{
    try{
     connectDB()
     console.log(`Server started at http://localhost:${PORT},`)}
    catch(error)
    {
        console.log("Error starting the app:"+error)
    }
    
     
})

