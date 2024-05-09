const express=require('express')
const cors=require('cors')

require('dotenv').config()


const app=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const productRouter=require('./routes/product.router')
const paymentRouter=require('./routes/payment.router')
app.use('/api/',paymentRouter)
app.use('/api/products',productRouter)




app.listen(8000,()=>{
    console.log('server running at port 8000')
})