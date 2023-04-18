const User = require('../models/userModel')

// Login user
const loginUser = async (req,res)=>{
res.json({message: 'login'})
} 



// sign up user
const signupUser = async(req,res)=>{
  res.json({message: 'signup'})
}


module.exports = {
  loginUser,
  signupUser
}