const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const key = require("../config/keys").SECRET_OR_KEY;

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("This user already exists");
    }

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

    const token = jwt.sign({ id: user._id }, key);

    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("This user does not exist");

    const isValidPassword = await bcrypt.compareSync(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign({ id: user.id }, key);

    return { token, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const verifyUser = async data => {
  try {
    const { token } = data;
    const decoded = jwt.verify(token, key);
    const { id } = decoded;

    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false;
    });

    // just add the `id` to what you return!
    return { loggedIn, id };
  } catch (err) {
    return { loggedIn: false };
  }
};

module.exports = { register, login, verifyUser };
