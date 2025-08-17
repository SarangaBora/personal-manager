import jwt from 'jsonwebtoken'


export const authenticate =(req,res,next)=>{
    const token = req.cookies.token
    
    if(!token)
    {
        return res.status(401).json({message:"User not authenticated!!!"})

    }
    try
    {
        const decoded = jwt.verify(token,process.env.SECRET_JWT_KEY)
        req.user = decoded //attach user info to request object
        next() 
    }catch(error)
    {
        return res.status(401).json({message:"User not authenticated!!!"})
    }

}