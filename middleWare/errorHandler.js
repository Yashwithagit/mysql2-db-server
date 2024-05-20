function errorHandler(error,req,res,next){
if(error.name=='UnauthorizedError'){
    return res.send({error:'error',message:'Please Login to Add Item to Cart'})
}else
return res.status(500).send({message:`Something went wrong`})
}

module.exports=errorHandler