import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  //Generating token
  const payload = { userId };
  const secret = process.env.JWT_SECRETKEY;
  const token = jwt.sign(payload, secret, { expiresIn: "15d" });

  //setting cookie
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //MS
    httpOnly: true, //prevent xss attacks, cross-site scripting attacks
    sameSite: "strict", //prevent CSRF attacks, cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
