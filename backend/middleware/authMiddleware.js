const jwt=require("jsonwebtoken");
require("dotenv").config();

const creatorMiddleware=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET_KEY1,async function(err,decoded){
    if(err){
        res.status(400).send(err)
    }
    if(decoded){
    req.user=decoded.id
        next()
    }
    });

}
module.exports=creatorMiddleware