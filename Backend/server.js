import express from "express";
import auth from "./routes/auth.route.js";
import dotenv from "dotenv";
import MongoConnect from "./Db/MongoConnect.js";

const app = express();

//Loading env variables
dotenv.config();

//PORT
const PORT = process.env.PORT;

//MongoDB Connection
MongoConnect();

//Middleware
app.use("/api/auth", auth);

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
