const mongoose=require("mongoose");
const express=require('express');
const dotenv=require("dotenv").config();
const port=process.env.PORT;
const connection=require("./configs/db")
const app=express();
const userRouter=require("./routes/user.routes");
const cors=require("cors");
const fs=require("fs");
const path=require("path")
const libraryRouter=require("./routes/library.routes")
const morgan = require('morgan')

app.use(cors())

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


app.use(morgan('combined', { stream: accessLogStream }))

app.use("/user",userRouter)
app.use("/library",libraryRouter)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`Server connection to db and running at port ${port}`)
    } catch (error) {
        res.status(400).send(error)
    }
})
