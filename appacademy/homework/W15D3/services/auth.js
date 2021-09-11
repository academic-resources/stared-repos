const validateInputs = require('../validation/register')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')

const register = async data => {
  try {
    // step 1: Validate Inputs
    const { message, isValid } = validateInputs(data)
    if (!isValid) {
      throw new Error(message)
    }

    const { name, email, password } = data

    // step 2: Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)

    // step 3: Constructing and saving a new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    })
    user.save()

    // step 4: create an Auth token
    const id = user._doc._id
    const token = jwt.sign({ id: user.id }, keys.secretOrKey)

    // step 5: returning all of our user's information and
    // setting `loggedIn` to true
    return { token, loggedIn: true, ...user._doc, id, password: null }
  } catch (err) {
    throw err
  }
}

module.exports = { register }
