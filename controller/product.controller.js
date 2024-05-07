const pool=require('../connectDb')

const productController={
    getAll:async(req,res)=>{
        try {
            const [rows, fields]=await pool.query('select * from product')
            res.json({
                data:rows
            })
            
        } catch (error) {
            res.json({
                status:'error',
                message:'Something went wrong'
            })
        }
    }
}

module.exports=productController