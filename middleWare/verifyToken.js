
const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){
    if (!req) {
        return res.json({ message: 'Invalid request' });
      }
    const token=req.header("Authorization")
    if(!token){
        return res.json({
            status: 'error',
            message: 'Access Denied'
        });
    }
    const decoded=jwt.verify(
        token.split(' ')[1],process.env.JWT_SECRET_KEY
     )
     req.user=decoded
    try {
      
        next()
        
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Invalid Token'
        });
    }
}

module.exports=verifyToken