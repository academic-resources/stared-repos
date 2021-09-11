const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secretOrKey } = require("../../config/keys");
const validateRegisterInput = require("../validation/register")
const validateLoginInput = require("../validation/login")

// here we'll be taking in the `data` from our mutation
const register = async data => {
  try {
    // run it through our validator which returns if the data isValid
    // and if not it returns a nice message for the client side
    const { message, isValid } = validateRegisterInput(data);

    // if the data we received isn't valid through up the error message from validator
    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;

    // we want to wait until our model can tell us whether a user exists with that email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with all our arguments
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

    // save our user
    user.save();

    const token = jwt.sign({ id: user._id }, secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  const { _id } = data;
  const leavingUser = await User.findById(_id)
  const token = '';
  return { token, loggedIn: false, ...leavingUser._doc, password: null }
}

const login = async data => {
  try {
    // use our other validator we wrote to validate this data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error("Email does not exist")
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password)
    if(!passwordMatch) {
      throw new Error("Password does not match")
    }
    const token = jwt.sign({ id: user._id }, secretOrKey);
    return { token, loggedIn: true, ...user._doc, password: null }

  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, secretOrKey);
    const { id } = decoded;

    // then we try to use the User with the id we just decoded
    // making sure we await the response
    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    return { loggedIn };
  } catch (err) {
    return { loggedIn: false };
  }
};


module.exports = { register, logout, login, verifyUser };