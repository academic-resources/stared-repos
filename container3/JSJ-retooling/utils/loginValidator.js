const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../db/models');

module.exports = [
  check('identification')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username or email.')
    .custom(async (value, { req }) => {
      // If the identification entered scans as an email address
      if (value.toString().match(/@/g)) {
        // but lookup returns null
        const user = await User.findOne({ where: { email: value } });
        if (!user) {
          throw new Error('Invalid login.');
        } else if (user) {
          if (
            !bcrypt.compareSync(
              req.body.password,
              user.hashedPassword.toString()
            )
          ) {
            throw new Error('Invalid login.');
          }
        } else return true;
      } else {
        // If the identification scans as a regular username, but lookup
        // still returns null
        const user = await User.findOne({ where: { userName: value } });
        if (!user) {
          throw new Error('Invalid login.');
          // otherwise this error validation is complete.
        } else if (user) {
          if (
            !bcrypt.compareSync(
              req.body.password,
              user.hashedPassword.toString()
            )
          ) {
            throw new Error('Invalid login.');
          }
        } else return true;
      }
    }),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.')
];
