
const {Cashfree}=require('cashfree-pg');
const pool = require('../connectDb');

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


const paymentController={
    payment:async(req,res,next)=>{
        const userId=req.user.userId
        const [rows,fields]=await pool.query('SELECT * FROM users where user_id = ?',[userId])
        console.log(rows[0].user_name,'saddsadsa')
        try {
            const {amount,currency,id}=req.body
            const request = {
                "order_amount":amount,
                "order_currency": currency,
                "order_id": id,
                "customer_details": {
                    "customer_id": rows[0].user_name,
                    "customer_phone": "9677777789",
                    'customer_email':rows[0].email,
                },
                "order_meta": {
                    "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
                }
            };
            Cashfree.PGCreateOrder("2022-09-01", request).then((response) => {
                res.json({
                    status:'success',
                    data:response.data
                })
                // res.send(response.data)
            }).catch((error) => {
                res.json({
                    status:'error',
                    message:error.response.data.message
                })
               
            });
            
        } catch (error) {
          return next(error)
        }
    },
    verify:async(req,res,next)=>{
        try {
            let {orderId}=req.body
            Cashfree.PGOrderFetchPayments("2022-09-01",orderId).then((response)=>{
                // res.json(response.data)
                res.json({
                    status:'success',
                    data:response.data
                })
            }).catch((error)=>{
                res.json({
                    status:'error',
                    message:error.response.data.message
                })
            })
            
        } catch (error) {
           return next(error)
        }
    }
   

}

module.exports=paymentController