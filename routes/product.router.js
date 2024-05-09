const express=require('express')
const router=express.Router()
const productController=require('../controller/product.controller')

router.get('/',productController.getAll)
router.get('/:id',productController.getById)
router.post('/addCart',productController.addToCart)

module.exports=router