const express=require('express')
const router=express.Router()
const orderController=require('../controller/order.controller')
const verifyToken = require("../middleWare/verifyToken");

router.get('/',orderController.getAll)
router.get('/productList',verifyToken,orderController.getAllProducts)

router.post('/updateOrder',verifyToken,orderController.updateOrder)
module.exports=router