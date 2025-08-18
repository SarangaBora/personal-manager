import express from "express";
import { authenticate } from "../utils/authenticateRoutes";
import {  getTasksByDate } from "../controller/tasks.controller";








const router= express.Router()

router.get('/getTasks',authenticate,getTasksByDate)



export default router 