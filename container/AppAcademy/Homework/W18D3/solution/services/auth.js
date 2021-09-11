const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");
const validateInputs = require("../validation/register");

// here we'll be taking in the `data` from our mutation
const register = async data => {
  try {
    const { message, isValid } = validateInputs(data);
    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(
      {
        name,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    user.save();

    const token = jwt.sign({ id: user._id }, keys.secretOrkey);
    const id = user._doc._id;
    return { token, loggedIn: true, ...user._doc, id, password: null };
  } catch (err) {
    throw err;
  }
};

module.exports = { register };
