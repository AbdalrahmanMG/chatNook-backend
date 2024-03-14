const {User, validateUser} = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const validationResult = await validateUser(req.body)
    if (!validationResult) {
        return res.status(400).json({
            errors: validationResult.errors
        })
    }

    const { fullName, phone, email, password } = req.body;
    const passwordHashed = await bcryptjs.hashSync(password, 10);

    const newUser = await User({
      fullName,
      password: passwordHashed,
      email,
      phone,
    });

    await newUser.save();
    if (!newUser) {
        return res.status(400).json({
            success:false,
            message: "failed to create User!"
        })
    }
    return res.status(201).json({ success: true, message: "" , newuser:newUser});
  } catch (error) {
    return res.status(500).json({success: false, message: error.message})
  }
};

const login = (req, res) => {
  res.send("loging in ...");
};

const logout = (req, res) => {
  res.send("logging out ...");
};

module.exports = { login, logout, signup };
