import express from "express";
import { register,login } from "../Controllers/user.controller.js";

const router= express.Router()  ;


// user router

//desc - put the data
// route-  /api/user/register 
router.post('/register',register)

// desc- login 
// route-  /api/user/login
router.post('/login',login)
export default router;