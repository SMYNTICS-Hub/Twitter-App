import mongoose from "mongoose";

//creating user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
    profileImg: {
      type: mongoose.Schema.Types.ObjectId,
      default: "",
    },
    coverImg: {
      type: string,
      default: "",
    },
    bio: {
      type: string,
      default: "",
    },
    link: {
      type: string,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
