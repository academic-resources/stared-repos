const { check } = require('express-validator');
const { User } = require('../db/models');

module.exports = [
  check('userName')
    .exists({ checkFalsy: true })
    .custom(async (value) => {
      if (await User.findOne({ where: { userName: value } })) {
        throw new Error('The provided user name is already in use.');
      } else {
        const invalidCharacters = '!?~`@#$%^&*(){}\\/<>,[]|';
        for (const letter of value) {
          if (invalidCharacters.includes(letter)) {
            throw new Error('User name contains invalid character.');
          }
        }
        return true;
      }
    }),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom(async (value) => {
      if (await User.findOne({ where: { email: value } })) {
        throw new Error('The provided email is already in use.');
      } else return true;
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .withMessage('Please confirm password.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Confirm Password does not match Password');
      } else return true;
    })
];
