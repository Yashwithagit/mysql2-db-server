const express=require('express')
const cors=require('cors')
const {Cashfree}=require('cashfree-pg')
const crypto=require('crypto')
require('dotenv').config()


const app=express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const productRouter=require('./routes/product.router')
app.use('/api/products',productRouter)

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


const getGenerateOrderId=()=>{
    const uniqueId=crypto.randomBytes(16).toString('hex')
    const hash=crypto.createHash('sha256')
    hash.update(uniqueId)

    const orderId=hash.digest('hex')
    return orderId.substring(0,12)

}
app.get('/',(req,res)=>{
    res.send('hello')
})

app.get('/payment',async(req,res)=>{
try {
    const request = {
        "order_amount": 1,
        "order_currency": "INR",
        "order_id": await getGenerateOrderId(),
        "customer_details": {
            "customer_id": "walterwNrcMi",
            "customer_phone": "9999999999"
        },
        "order_meta": {
            "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
        }
    };
  
    Cashfree.PGCreateOrder("2022-09-01", request).then((response) => {
        console.log('Order Created successfully:',response.data)
        res.send(response.data)
        res.send('hello payment success')
    }).catch((error) => {
        res.send('hello payment error')
        console.error('Error:', error.response.data.message);
    });

}catch(err){
    console.log(err)
}


})
app.post('/verify',async(req,res)=>{
try {
    let {orderId}=req.body
    Cashfree.PGOrderFetchPayments("2022-09-01",orderId).then((response)=>{
        res.json(response.data)
    }).catch((error)=>{
        console.error('Error:', error.response.data.message);
    })

} catch (error) {
    console.log(error)
}

})
app.listen(8000,()=>{
    console.log('server running at port 8000')
})