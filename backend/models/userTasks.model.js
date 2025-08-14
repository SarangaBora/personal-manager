import mongoose from "mongoose";

const taskSchema= new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    task:{
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    }
},{timestamps:true})


const Task = mongoose.model("Task",taskSchema)

export default Task;