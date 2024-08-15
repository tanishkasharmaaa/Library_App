const jwt=require("jsonwebtoken");
const userModel = require("../models/user.model");
const dotenv=require("dotenv").config();

const creatorMiddleware=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader&&authHeader.split(" ")[1];
    jwt.verify(token,"masaiLibrary",async function(err,decoded){
    if(err){
        res.status(400).send(err)
    }
    if(decoded){
        next()
    }
    });

}
module.exports=creatorMiddleware