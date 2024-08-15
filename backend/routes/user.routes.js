const express=require("express");
const router=express.Router();
const userModel=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv").config()

router.use(express.json())

router.get("/",async(req,res)=>{
    try {
        const user=await userModel.find()
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
    }
})

router.post("/register",async(req,res)=>{
     const {name,email,password,role}=req.body;
     console.log(password)
    try {
      let user
     let hash= bcrypt.hash(password,5, async function(err, hash) {
        if(err){
            res.status(400).send(err)
        }
        if(hash){
             user=new userModel({name,
            email,
            password:hash,
            role}); 
        }
        await user.save();
    });

      
        
        res.status(201).json({message:"registered successfully"})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post("/login",async(req,res)=>{
    const{email,password}=req.body;
   
    try {
       
        let user=await userModel.findOne({email});
       if(!user){
        return res.status(400).json({ message: "User not found" });
       }
        
       isMatch=await bcrypt.compare(password,user.password)
          if(!isMatch){
            return res.status(400).json({message:"incorrect password"});
          }
         
          const accessToken=jwt.sign({email:user.email},process.env.JWT_SECRET_KEY1,{algorithm:"HS256"});
          res.status(200).json({message:"Login Successful",accessToken})
    } catch (error) {
        res.status(400).send(error)
    }
})




module.exports=router