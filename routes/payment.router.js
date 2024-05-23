const express=require('express')
const router=express.Router()
const paymentController=require('../controller/payment.controller')
const verifyToken = require("../middleWare/verifyToken");

router.post('/payment',verifyToken,paymentController.payment)
router.post('/verify',paymentController.verify)


module.exports=router