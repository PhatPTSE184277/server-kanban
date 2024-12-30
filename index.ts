import dotenv from "dotenv";
import express from "express";
dotenv.config();

const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.2ji6s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});