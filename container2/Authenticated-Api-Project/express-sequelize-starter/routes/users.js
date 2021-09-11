const express = require("express");
const userRouter = express.Router();
const { check } = require("express-validator");
const db = require("../db/models");
const { User, Tweet } = db;
const bcrypt = require("bcryptjs");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");

userRouter.use(requireAuth);

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword.toString());
};

const validateUsername = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username"),
];

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
];

userRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    res.send("hello!");
  })
);

userRouter.post(
  "/",
  validateUsername,
  validateEmailAndPassword,
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, hashedPassword });

    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

userRouter.post(
  "/token",
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });

    //TODO: Password validation and error handling
    if (!user || !user.validate(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    //TODO: Token generation
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

userRouter.get(
  "/:id(\\d+)/tweets",
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    console.log();
    const tweets = await User.findByPk(userId, { include: ["tweets"] });
    res.json({ tweets });
  })
);

module.exports = userRouter;
