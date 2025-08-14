import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const connectDB= async()=>{//export because we will be using this in another module 
     try{
        const con= await mongoose.connect(process.env.MONGO_URI)//actual connecting function i.e mongoose.connect
        
        console.log(`Mongoose connected:  ${con.connection.host}`)
     }
     catch(error)
     {
        console.log('Unable to connect to mongoDB')
        process.exit(1)
     }
} 