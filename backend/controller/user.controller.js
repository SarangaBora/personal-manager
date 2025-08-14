import express from 'express'
import {v4 as uuidv4} from 'uuid'  
import User from "../models/users.model.js"
import tokenGenerate from '../utils/generateToken.js'

//CREATE new user/SignUP logic
export const createUser =  async (req,res) =>{
    
    const {name,email,age,password}=req.body
    console.log(name + email + age)
    if(!name|| !email ||!age||!password)
    {
        return res.status(400).json({
            error:"All the fields are not provided,as all are required."
        })
    }
    
    const uuid= uuidv4()
    const userId= `${name}-${uuid}`
    
    try{
    //    const newUser = new User({
    //     userId,
    //     name,
    //     email,
    //     age
    //    })
    //    await newUser.save()
       const newUser = await User.signup(name,email,password,age,uuid)//static signup using bcrypt to hash pass and creating a func in users.models.js to signup
       const token= await tokenGenerate(newUser)//from utils,generate token on signing up
       res.status(201).json({message:"Successfully created a new user.",user:newUser,sessionToken:token})
       
       console.log(message)
    }catch(error)
    {
        console.error('Error creating a new user :', error)
        res.status(500).json({message:"A new user was not created.Server error!",error:`${error}`})

    }
} 



//Login USER
export const LoginUser= async(req,res) =>{
    const {email,password}=req.body

    try{
        const user = await User.login(email,password)//static method to find the user,validate the existance,password match logic
        const token= await tokenGenerate(user)


        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production', //apparently we cant have this val true when not HTTPS.
            sameSite:'Strict',
            maxAge:3 * 24 * 60 * 60 * 1000 //3 days in ms
        })  
        res.status(201).json({message:`User: ${user.name} successfully logged in`, userData:user})
    }
    catch(error)
    {
        res.status(500).json({message:`Unable to Login . Error :${error}`})
    }
}


//DELETE user
export const delUser = async (req,res) =>{
    const {id} = req.params
    console.log(id)

    try{
        
        const user = await User.findOne({userId:id})
        
        if(!user)
        {
            return res.status(404).json({message:"User not found"})
        }
        
        await User.findOneAndDelete(id)
        res.status(200).json({message:`The user-${user.name} has been removed`,status:"OK"})
    }catch(error)
    {
        
        res.status(400).json({message:"Error deleting the user!"})
    }
}

//GET all users
export const allUsers = async (req,res)=>{
    //extra function
    function listAllUsers(everyUser)
    {
    everyUser.forEach(user=>{
        console.log(user.name)
    })
    }
    try{

        const everyUser = await User.find()//retrieves all documents of the collection "User/UserSchema"
        
        if(everyUser.length==0)
        {
            return res.status(404).json({message:"No users were found! Empty."})
        }
        res.status(200).json({message:"Successfully retrieved all users",users:everyUser})//sending users in res so that the frontend can extract data later.
       
        listAllUsers(everyUser) 
    }
    catch(error)
    {
        res.status(500).json({message:"Failed to retrieve all users",status:"Failed"})
    }
}



//GET user by id

export const getUserById=async (req,res)=>{
  const userId= req.params.id
  try{
    const user = await User.findOne({userId:userId})
  
    if(!user)
    {
      return res.status(400).json({message:'User not found'})
    }
    else{
      res.status(200).json({message:`User found with name ${user.name}`,user:user,status:"Ok"})
      console.log(message)
    }
    }
  catch(error)
   {
     res.status(500).json({message:'Couldnt retrieve user ',error:error.message}) 
   }
}






