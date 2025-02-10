import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../Lib/Utils/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
  try {
    const { username, email, fullname, password } = req.body;

    //email validation
    let regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regx.test(email)) {
      return res.status(400).json({ error: "The email is not valid!" });
    }

    //userProfile validation
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "The username is already taken!" });
    }

    //emailProfile validation
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "The email is already taken!" });
    }

    if (password.length <= 6) {
      res.status(400).json({ error: "Password length should be six or more!" });
    }

    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user
    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
    }
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });
  } catch (error) {
    console.log("Error in signup controller. \nError: " + error.message);
    return res.status(500).json({ error: "Internal server error! " + error });
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
