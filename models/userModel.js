const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});
userSchema.statics.signup = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // check if the email is valid
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  // lowerecase uppercase , number , symbol , min 8 character
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password is not strong, try to combine uppercase,lowercase,number,symbol, and minimum 8 characters "
    );
  }

  const exist = await this.findOne({ email });

  if (exist) {
    throw Errorr("Email already used");
  }

  //encript password or hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create on user
  const user = await this.create({ email, password: hash });
  return user;
};

// user log in here
userSchema.static.login = async function (email, password) {
  // Validation
  if (!email || !password) {
    throw Error("All fields must be fields");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
