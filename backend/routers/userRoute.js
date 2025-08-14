import express from "express";
import { createUser ,getUserById,delUser,allUsers, LoginUser} from "../controller/user.controller.js";



const router = express.Router()

router.post('/createNew',createUser)//Sign Up

router.post('/login',LoginUser)//Sign In

router.get('/find/:id',getUserById) //we place this line here as the callback function used is an arrow function and not a traditional method function,ie, we need to declare the arrow first.

router.delete("/del/:id",delUser)

router.get("/allUsers",allUsers)



export default router