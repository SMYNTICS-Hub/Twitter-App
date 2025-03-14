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
    console.log("Error in signup. \nError: " + error.message);
    return res.status(500).json({ error: "Internal server error! " + error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    console.log("Error in login. \nError: " + error.message);
    return res.status(500).json({ error: "Internal server error! " + error });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    console.log("Logged out successfully!");
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (error) {
    console.log("Error in logout. \nError: " + error);
    return res.status(500).json({ error: "Internal server error! " + error });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller. \nError: " + error);
    return res.status(500).json({ error: "Internal server error! " + error });
  }
};
