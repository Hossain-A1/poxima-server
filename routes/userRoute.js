const express = require("express");

const { loginUser, signupUser } = require("../controllers/userController");

// Router
const router = express.Router();

// Log in
router.post("/login", loginUser);

// sign up
router.post("/signup", signupUser);

module.exports = router;
