const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (userId, res) => {
  const token = jwt.sign({userId:userId}, SECRET_KEY, {
    expiresIn: "1d",
  });
  res.cookie("jwt", token, {
    maxAge: 1 * 24 * 3600 * 1000,
    httpOnly: true, //prevent XSS attacks
    sameSite: "strict",
  });
};

module.exports = generateToken;
