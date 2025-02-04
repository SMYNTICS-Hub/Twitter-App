import express from "express";
import auth from "./routes/auth.route.js";
import dotenv from "dotenv";
import MongoConnect from "./Db/MongoConnect.js";

//Loading env variables
dotenv.config();

const app = express();
const PORT = process.env.PORT; //PORT

MongoConnect(); //MongoDB Connection

//Middleware
app.use("/api/auth", auth);
app.use(express.json()); //to parse req.body

//Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
