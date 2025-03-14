import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    if (!decoded) {
      return res.status(401).json({ error: "unauthorized: Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    //attaching the user object to the req (request) object as a new property, without password
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute. \nError: " + error.message);
    return res.status(500).json({ error: "Internal server error! " + error });
  }
};
