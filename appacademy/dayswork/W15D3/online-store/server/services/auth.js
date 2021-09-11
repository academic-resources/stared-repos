const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../../config/keys')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data)
    if (!isValid) {
      throw new Error(message)
    }
    const { name, email, password } = data
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new Error('This user already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      name,
      email,
      password: hashedPassword
    })

    user.save()

    const token = jwt.sign({ id: user._id }, keys.secretOrKey)

    return { token, loggedIn: true, ...user._doc, password: null }
  } catch (err) {
    throw err
  }
}

const logout = async id => {
  try {
    const currentUser = await User.findById(id)
    if (!currentUser) {
      throw new Error('This user is not logged in')
    }
    return { token: '', loggedIn: false, ...currentUser._doc, password: null }
  } catch (error) {
    throw error
  }
}

const login = async data => {
  try {
    const { message, isValid } = validateLoginInput(data)

    if (!isValid) {
      throw new Error(message)
    }
  } catch (err) {
    throw err
  }

  const { email, password } = data
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('User does not exist')
  }

  const validPassword = await bcrypt.compareSync(password, user.password)
  if (!validPassword) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ id: user._id }, keys.secretOrKey)

  return { token, loggedIn: true, ...user._doc, password: null }
}

const verifyUser = async data => {
  try {
    const { token } = data
    const decoded = jwt.verify(token, keys.secretOrKey)
    const { id } = decoded

    const loggedIn = await User.findById(id).then(user => {
      return user ? true : false
    })

    return { loggedIn }
  } catch (err) {
    return { loggedIn: false }
  }
}

module.exports = { register, logout, login, verifyUser }
