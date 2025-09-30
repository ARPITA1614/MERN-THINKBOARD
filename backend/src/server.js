import express from "express";  //when type: module
// const express= require("express"); // when type : common.js
import dotenv from "dotenv";
import cors from "cors"; 
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB } from "./config/db.js";
  //access env variables to access env variable where we cn keep our secret separately fom code base
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();


const app=express();
const PORT=process.env.PORT || 5001;

//middleware : allows to get access to resquest.body send as json   
//function run btw req and response
//just before sending response we can do something
app.use(cors({
    origin:"http://localhost:5175",
}
));

app.use(express.json()) ;
app.use(rateLimiter);
//this middleware will parse JSON bedies: req body

// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} & REq URL is {req.url}`);
//     next();
// });

app.use("/api/notes",notesRoutes);

connectDB().then(() =>{
    app.listen(PORT,()=>{
    console.log("Server started on PORT:",PORT)
});

});
