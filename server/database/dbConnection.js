import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

 const  dbConnect=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
  useUnifiedTopology: true,
    }).then(()=>console.log("db connected"))
    .catch((err)=>console.error("mongodb connection error",err))
}

export default dbConnect

