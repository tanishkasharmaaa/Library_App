const jwt=require("jsonwebtoken");
const userModel = require("../models/User");
const dotenv=require("dotenv").config();

const userMiddleware=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    jwt.verify(token,"masaiLibrary",async function(err,decoded){
    if(err){
        res.status(400).send(err)
    }
    if(decoded){
        let email=decoded.email
        let resultUser=await userModel.findOne({email})
        if(resultUser.role==="VIEWER"||resultUser.role==="CREATOR"||resultUser.role==="VIEW_ALL"){
        
            next()
        }
       
        else{
            res.status(404).send("You are not allowed to access this route")
        }
    }
    });

}
module.exports=userMiddleware