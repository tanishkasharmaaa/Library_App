const express=require("express");
const dotenv=require("dotenv").config();
const libraryRouter=express.Router();
const booksModel=require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");
const userMiddleware=require("../middleware/userMiddleware");
const creatorMiddleware=require("../middleware/creatorMiddleware")

libraryRouter.use(express.json());

libraryRouter.post('/create',[authMiddleware,creatorMiddleware],async(req,res)=>{
    const {title,author,description,genres,pages,language,publisher,coverImageUrl,availableCopies,storyContent} = req.body
    try {
        const books=await booksModel({
            creatorId:req.user,
            title,
            author,
            description,
            storyContent,
            genres,
            pages,
            language,
            publisher,
            coverImageUrl,
            availableCopies
        });
        await books.save()
        res.status(201).send(books)
    } catch (error) {
        res.status(400).send(error)
    }
})

libraryRouter.get('/books', [authMiddleware, userMiddleware], async (req, res) => {
    try {
        let query = {};

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

libraryRouter.get('/books/:id', [authMiddleware, userMiddleware], async (req, res) => {
    try {
        const books = await booksModel.findById(req.params.id)
        res.send(books);
    } catch (error) {
        res.status(500).send({ message: "Failed to fetch books", error });
    }
});

libraryRouter.get('/createdBooks',async(req,res)=>{
    try {
        const createdBooks= await booksModel.find({creatorId:req.user})
        res.send(createdBooks)
    } catch (error) {
        console.log(error)
         res.status(500).send({ message: "Failed to fetch books", error });
    }
})

libraryRouter.delete('/books/:id', [authMiddleware, creatorMiddleware], async (req, res) => {
  try {
    const deletedBook = await booksModel.findOneAndDelete({
      _id: req.params.id,
      creatorId: req.user,
    });

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found or unauthorized" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Request failed", error });
  }
});


libraryRouter.patch(
  '/books/:id',
  [authMiddleware, creatorMiddleware],
  async (req, res) => {
    try {
      const updatedBook = await booksModel.findOneAndUpdate(
        { _id: req.params.id, creatorId: req.user }, 
        req.body,
        { new: true } 
      );

      if (!updatedBook) {
        return res.status(404).json({ message: "Book not found or unauthorized" });
      }

      res.status(200).json({ message: "Data updated", data: updatedBook });
    } catch (error) {
      res.status(500).json({ message: "Request failed", error });
    }
  }
);


module.exports=libraryRouter