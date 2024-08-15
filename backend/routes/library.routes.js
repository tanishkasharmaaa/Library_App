const express=require("express");
const dotenv=require("dotenv").config();
const libraryRouter=express.Router();
const booksModel=require("../models/books.model");
const authMiddleware = require("../middleware/authMiddleware");
const userMiddleware=require("../middleware/userMiddleware");
const creatorMiddleware=require("../middleware/creatorMiddleware")

libraryRouter.use(express.json());

libraryRouter.post('/create',[authMiddleware,creatorMiddleware],async(req,res)=>{
    try {
        const books=new booksModel(req.body);
        await books.save()
        res.status(201).send(books)
    } catch (error) {
        res.status(400).send(error)
    }
})

libraryRouter.get('/books', [authMiddleware, userMiddleware], async (req, res) => {
    try {
        let query = {};

        // Time-based filtering (old/new books)
        if (req.query.old) {
            const timeLimit = new Date(Date.now() - 10 * 60000); // 10 minutes ago
            query.createdAt = { $lt: timeLimit }; // Books created more than 10 minutes ago
        } else if (req.query.new) {
            const timeLimit = new Date(Date.now() - 10 * 60000); // 10 minutes ago
            query.createdAt = { $gt: timeLimit }; // Books created within the last 10 minutes
        }

        const books = await booksModel.find(query).sort({ createdAt: -1 });
        res.send(books);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch books", error });
    }
});

libraryRouter.delete('/books/:id',[authMiddleware,creatorMiddleware],async(req,res)=>{
    try {
        const books=await booksModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send("Data deleted")
    } catch (error) {
        res.json({message:"request failure",err:error})
    }
})

libraryRouter.patch('/books/:id',[authMiddleware,creatorMiddleware],async(req,res)=>{
    try {
        const books=await booksModel.findByIdAndUpdate({_id:req.params.id},req.body);
        res.status(200).send("Data updated")
    } catch (error) {
        res.json({message:"request failure",err:error})
    }
})

module.exports=libraryRouter