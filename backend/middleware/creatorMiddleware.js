const jwt=require("jsonwebtoken");
const userModel = require("../models/user.model");
const dotenv=require("dotenv").config();

const userMiddleware=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader&&authHeader.split(" ")[1];
    jwt.verify(token,"masaiLibrary",async function(err,decoded){
    if(err){
        res.status(400).send(err)
    }
    if(decoded){
        let email=decoded.email
        let resultUser=await userModel.findOne({email})
        if(resultUser.role==="CREATOR"){
        
            next()
        }
       
        else{
            res.status(404).send("You are not allowed to access this route")
        }
    }
    });

}
module.exports=userMiddleware