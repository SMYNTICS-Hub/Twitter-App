import mongoose from "mongoose";
import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const [username, email, fullname, password] = req.body;

    //email validation
    let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email != regx.test) {
      return res.status(400).json({ error: "The email is not valid!" });
    }

    //userProfile validation
    const existingUser = await mongoose.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "The username is already taken!" });
    }

    //emailProfile validation
    const existingEmail = await mongoose.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "The email is already taken!" });
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    //creating new user
    newUser = new User({
      fullname,
      username,
      email,
      hashedPassword,
    });
  } catch (error) {
    console.log("Error in signup controller");
    return res.status(500).json({ error: "Internal server error!" });
  }
};

export const login = async (req, res) => {
  res.json({
    message: "login successful!",
  });
};

export const logout = async (req, res) => {
  res.json({
    message: "logout successful!",
  });
};
