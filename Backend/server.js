import express from "express";
import auth from "./routes/auth.route.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import MongoConnect from "./Db/MongoConnect.js";
import cookieParser from "cookie-parser";

//Loading env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT; //PORT

MongoConnect(); //MongoDB Connection

//Middleware
app.use(express.json()); //to parse req.body
app.use(express.urlencoded({ extended: true })); //to parse form data
app.use(cookieParser()); //to parse cookies

app.use("/api/auth", auth);

//Start server
const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));
