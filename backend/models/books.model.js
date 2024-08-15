const mongoose=require("mongoose");
const booksSchema= mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      author: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true
      },
     
      genres: {
        type: [String],
        required: true
      },
      
      pages: {
        type: Number,
        required: true
      },
      language: {
        type: String,
        required: true
      },
      publisher: {
        type: String,
        trim: true
      },
      coverImageUrl: {
        type: String,
        trim: true
      },
      availableCopies: {
        type: Number,
        default: 1
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
},{versionKey:false,timeStamp:true})

const bookModel=mongoose.model("Books",booksSchema);

module.exports=bookModel;