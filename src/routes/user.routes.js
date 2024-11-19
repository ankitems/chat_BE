import {  getUserByUserName, login, signup } from "../controller/user.controller.js";
import express from 'express'
import authMiddileware from "../middleware/auth.middleware.js";
const userRoute=express.Router()

userRoute.post("/login", login);
userRoute.post("/signup", signup);
userRoute.get("/user/:userName",authMiddileware, getUserByUserName);
export default userRoute