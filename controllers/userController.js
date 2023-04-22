const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" });
};
// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create token
    const token = createToken(user._id);
    React.status(200).json({ email, token });
  } catch (error) {
    req.status(400).json({ error: error.message });
  }
};

// sign up user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    // create Token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (er) {
    res.status(400).json({ error: er.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
};
