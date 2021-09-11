const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { loginUser } = require('../auth');
const request = require('superagent')

const db = require('../models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();

//sign up form request that includes csurf protection and password hashing
router.get('/sign-up', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('sign-up', {
    title: 'Sign Up',
    user,
    signUp: true,
    csrfToken: req.csrfToken(),
  });
});

const userValidators = [
    check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for First Name')
      .isLength({ max: 50 })
      .withMessage('First Name must not be more than 50 characters long'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Last Name')
      .isLength({ max: 50 })
      .withMessage('Last Name must not be more than 50 characters long'),
      check('email')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Email Address')
      .isLength({ max: 255 })
      .withMessage('Email Address must not be more than 255 characters long')
      .isEmail()
      .withMessage('Email Address is not a valid email')
      .custom((value) => {
        return db.User.findOne({ where: { email: value } })
          .then((user) => {
            if (user) {
              return Promise.reject('The provided Email Address is already in use.');
            }
          });
        }),
    check('password')
    .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Password')
      .isLength({ max: 50 })
      .withMessage('Password must not be more than 50 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
      .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Confirm Password')
      .isLength({ max: 50 })
      .withMessage('Confirm Password must not be more than 50 characters long')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm Password does not match Password');
        }
        return true;
      }),
  ];

  router.post('/users', csrfProtection, userValidators,
  asyncHandler(async (req, res) => {
    const {
      email,
      firstName,
      lastName,
      password,
    } = req.body;

    const user = db.User.build({
      email,
      firstName,
      lastName,
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.role = 'fullUser';
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      res.redirect('/dashboard');
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('sign-up', {
        title: 'Sign Up',
        user,
        errors,
        email,
        firstName,
        lastName,
        csrfToken: req.csrfToken(),
      });
    }
  }));

  // router.get('/sign-up/github', csrfProtection, (req, res) => {
  //   const {query} = req;
  //   const{code}= query
  //   if(!code){
  //     return res.send({
  //       success: false,
  //       message: 'Authentication with github failed'
  //     })
  //   }
  //   request
  //     .post('https:github.com/login/oauth/access_token')
  //     .send({
  //       client_id: process.env.CLIENTID,
  //       client_secret: process.env.GITSECRET,
  //       code: code
  //     })
  //     .set('Accept', 'application/json')
  //     .then(function(result) {
  //       const data= result.body;

  //       res.send(data)
  //     })
  //     .catch(error => console.error('Error:', error))


  // });

module.exports = router;
