import jwt from 'jsonwebtoken'
import { configDotenv } from 'dotenv'

configDotenv()

const tokenGenerate = (user)=>{

   return jwt.sign({_id:user._id , email:user.email , name:user.name}
      ,process.env.SECRET_JWT_KEY,
      {expiresIn:"3d"})
}

export default tokenGenerate