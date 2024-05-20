const pool=require('../connectDb')

const orderController={
    getAll:async(req,res,next)=>{
        try {
            const [rows, fields]=await pool.query('select * from user_order')
            res.json({
                status:'success',
                data:rows
            })
            
        } catch (error) {
            return next(error)
        }
    },
    getById:async(req,res,next)=>{
        try {
            const {id}=req.params
            const [rows, fields]=await pool.query(`select * from user_order where product_id=${id}`)
            res.json({
                status:'success',
                data:rows
            })
            
        } catch (error) {
            return next(error)
        }
    },
    updateOrder:async(req,res,next)=>{
        try {
            const {product_id,user_id,product_count,product_price,status,total_price}=req.body
            const [rows, fields]=await pool.query(`update product set cart=${cart} where product_id=${id}`)
            res.json({
                status:'success',
                message:`${cart===1?'Product Added to Cart Successfully':'Product Removed from the Cart Successfully'}`
            })

        }catch(error){
            return next(error)
        }
    }

}

module.exports=orderController