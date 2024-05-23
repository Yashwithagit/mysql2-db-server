const pool=require('../connectDb')

const productController={
    getAll:async(req,res,next)=>{
        try {
            const [rows, fields]=await pool.query('select * from product')
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
            const [rows, fields]=await pool.query(`select * from product where product_id=${id}`)
            res.json({
                status:'success',
                data:rows
            })
            
        } catch (error) {
            return next(error)
        }
    },
   

}

module.exports=productController