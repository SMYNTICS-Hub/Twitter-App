import express from "express";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

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

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

//Start server
const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));
