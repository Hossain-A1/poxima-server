const User = require("../models/userModel");

// Login user
const loginUser = async (req, res) => {
  res.json({ message: "login" });
};

// sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};