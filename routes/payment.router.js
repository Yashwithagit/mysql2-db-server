const express=require('express')
const router=express.Router()
const paymentController=require('../controller/payment.controller')

router.post('/payment',paymentController.payment)
router.post('/verify',paymentController.verify)


module.exports=router