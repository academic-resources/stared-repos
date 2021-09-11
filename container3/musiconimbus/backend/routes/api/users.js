const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, artistName } = req.body;
    const user = await User.signup({ email, password, firstName, lastName, artistName });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);


module.exports = router;
