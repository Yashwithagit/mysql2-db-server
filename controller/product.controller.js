const pool=require('../connectDb')

const productController={
    getAll:async(req,res)=>{
        try {
            const [rows, fields]=await pool.query('select * from product')
            res.json({
                status:'success',
                data:rows
            })
            
        } catch (error) {
            res.json({
                status:'error',
                message:'Something went wrong'
            })
        }
    },
    getById:async(req,res)=>{
        try {
            const {id}=req.params
            const [rows, fields]=await pool.query(`select * from product where product_id=${id}`)
            res.json({
                status:'success',
                data:rows
            })
            
        } catch (error) {
            res.json({
                status:'error',
                message:'Something went wrong'
            })
        }
    },
    addToCart:async(req,res)=>{
        try {
            const {id,cart}=req.body
            const [rows, fields]=await pool.query(`update product set cart=${cart} where product_id=${id}`)
            res.json({
                status:'success',
                message:`${cart===1?'Product Added to Cart Successfully':'Product Removed from the Cart Successfully'}`
            })

        }catch(error){
            res.json({
                status:'error',
                message:'Something went wrong'
            })
        }
    }

}

module.exports=productController