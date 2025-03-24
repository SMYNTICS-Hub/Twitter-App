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

//graceful shutdown
const exitHandler = async () => {
  console.log("Shutting down server...");

  try {
    // Close the server gracefully
    await new Promise((resolve) => server.close(resolve));
    console.log("Server closed");

    // Close the database connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");

    // Exit process
    process.exit(0);
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};

// Listen for termination signals
process.on("SIGINT", exitHandler); // Ctrl + C
process.on("SIGTERM", exitHandler); // Nodemon restarts
