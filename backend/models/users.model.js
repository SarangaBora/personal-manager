import mongoose from "mongoose";
import bcrypt from "bcrypt";


//func def to create user schema
const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique: true
    },

    name:{
        type:String,
        required:true,

    },

    email:{
        type:String,
        required:true,
        lowercase:true,
        match: [/.+\@.+\..+/, 'Invalid email format']
    },
    password:{
        type:String,
        required:true,
        
    },
    age:{
        type:Number,
        required:true,
        min:1,
        max:120
    }
},{
    timestamps:true
})


//check by mail. 
userSchema.statics.existsByEmail = async function(email){
    const user = await this.findOne({email})
    return !!user 
}



//static method to use in controller of users.
userSchema.statics.signup= async function(name,email,password,age,uuid){
    const exists = await this.existsByEmail(email)
    if(exists){
        console.log("Email in use")
        throw Error("Email in use")

    }
    const salt =await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user= await this.create({name,email,password:hash,age,userId:uuid})
    return user 
}

userSchema.statics.login = async function(email,password){
    if(!email || !password)
    {
        throw Error ("All fields not provided")
    }

    const user = await  this.findOne({email})//find wrt to email
    if(!user)
    {
        throw Error("Invalid email entered.")
    }
    const isMatch= await bcrypt.compare(password,user.password) //entered pass,user hashed pass
    if(!isMatch){
        throw Error("Invalid credentials")
    }
    return user 
}

//actually creating the schema

const User = mongoose.model('User',userSchema)

//exporting the created schema to other modules via....
export default User