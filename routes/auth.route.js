const express=require('express')
const router=express.Router()
const authController=require('../controller/auth.controller')
const verifyToken = require("../middleWare/verifyToken");



router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
router.get('/userInfo',verifyToken,authController.userInfo)
module.exports=router