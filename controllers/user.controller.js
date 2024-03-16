const { User, validateUser } = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

// regester function
const signup = async (req, res) => {
  try {
    const validationResult = await validateUser(req.body);
    if (!validationResult) {
      return res.status(400).json({
        errors: validationResult.errors,
      });
    }

    const { fullName, phone, email, password } = req.body;
    const passwordHashed = await bcryptjs.hash(password, 10);

    const newUser = await User({
      fullName,
      password: passwordHashed,
      email,
      phone,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "failed to create User!",
      });
    }
    generateToken(newUser.id, res);
    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "", newuser: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// login funciton
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "user is not found" });
    }

    generateToken(user.id, res);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// logout function
const logout = (req, res) => {
  try {
    res.cookie('jwt',"", {
        maxAge:0
    })
    return res.status(200).json({
        message: "logged out!"
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { login, logout, signup };
