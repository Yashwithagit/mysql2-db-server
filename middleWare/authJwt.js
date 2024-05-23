const { expressjwt }=require("express-jwt")
function authJwt(){
    const secret=process.env.JWT_SECRET_KEY
    return expressjwt({
        secret,
        algorithms:['HS256']
    }).unless({
        path:[
            {url:/\/api\/products(.*)/,methods:'GET'},
            {url:'/api/auth/login',methods:'POST'},
            {url:'/api/payment',methods:'POST'},
            {url:'/api/auth/register',methods:'POST'}
        ]
    })
}

module.exports=authJwt