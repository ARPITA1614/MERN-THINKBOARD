import express from "express";  //when type: module
// const express= require("express"); // when type : common.js
import dotenv from "dotenv";
import cors from "cors"; 
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB } from "./config/db.js";
  //access env variables to access env variable where we cn keep our secret separately fom code base
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path"

dotenv.config();


const app=express();
const PORT=process.env.PORT || 5001;
const __dirname=path.resolve()

//middleware : allows to get access to resquest.body send as json   
//function run btw req and response
//just before sending response we can do something

if(process.env.NODE_ENV !=="production"){
app.use(cors({
    origin:"http://localhost:5173",
})
);}

app.use(express.json()) ;
app.use(rateLimiter);
//this middleware will parse JSON bedies: req body

// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & REq URL is {req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);


if(process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.use(express.static(path.join(__dirname,"../frontend/dist")))  // middleware of express //goto dist serve as static

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html")) //if other than our api req serve it dist
});
}


connectDB().then(() =>{
    app.listen(PORT,()=>{
    console.log("Server started on PORT:",PORT)
});

});
