const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const { getUserToken, requireAuth } = require("../auth");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const db = require("../db/models");
const { use } = require("../app");
const { User } = db;

User.prototype.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword.toString());
};

const validateUserName = check("userName")
  .exists({ checkFalsy: true })
  .withMessage("Please provide a valid User Name");

const validateEmailAndPassword = [
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid Password"),
  check("confirmedPassword")
    .exists({ checkFalsy: true })
    .equals("confirmedPassword", "password")
    .withMessage("Password and Confirmed must match"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid Email"),
];

const validateUserNameAndPassword = [
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid User Name"),
  check("hashedPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid Password"),
];

userRouter.get("/userList", asyncHandler(async (req, res) => {
  const users = await User.findAll();
  // const userList = user.json();
  // const userName = userList.userName;
  // console.log(users);
  const usersArr = [];
  users.forEach((user) => {
    const userName = user.userName;
    const userId = user.id;
    usersArr.push({userName, userId});
  });
  // console.log(usersArr);
  res.send({
    usersArr
  });
}));

userRouter.post(
  "/",
  handleValidationErrors,
  validateUserName,
  validateEmailAndPassword,
  asyncHandler(async (req, res, next) => {

    const { userName, email, password, confirmedPassword, bio } = req.body;

    console.log(email);
    if (password !== confirmedPassword) {
      const err = new Error("Sign Up Failed");
      err.status = 401;
      err.title = "Sign Up failed";
      err.errors = "Password and Confirmed must match";
      err.confirm = false;
      return next(err);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ userName, email, hashedPassword, bio });


    const token = getUserToken(user);
    res.status(201).json({
      user: { id: user.id },
      token,
    });
  })
);

const passwordVali = function (password, user) {
  const result = user.validatePassword(password);
  // console.log(result);
  return result;
};

userRouter.post(
  "/token",
  validateUserNameAndPassword,
  asyncHandler(async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName,
      },
    });

    if (user === null) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = "The provided username does not exist.";
      err.user = false;
      return next(err);
    } else {
      const valiPass = passwordVali(password, user);
      // console.log(valiPass);
      if (valiPass === false) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = "The provided password is invalid.";
        err.password = false;
        return next(err);
      }
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
  })
);

userRouter.get("/:id", requireAuth, async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (user) {
    res.send({ user });
  } else {
    next();
  }
});

// Public Data for User Information (Ask JM about getting rid of HashedPass)
userRouter.get("/publicinfo/:id", async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (user) {
    res.send({ user });
  } else {
    next();
  }
});

userRouter.get(
  "/profile/:id",
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: "Articles",
    });

    if (user) {
      res.render("profile-page", { user });
    } else {
      next();
    }
  })
);

module.exports = userRouter;
