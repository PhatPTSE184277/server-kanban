import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import UserRouter from "./src/routers/user";
dotenv.config();

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.2ji6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

app.use("/auth", UserRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);    
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});