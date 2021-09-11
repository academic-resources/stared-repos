const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const PlayerRepository = require('../../db/player-repository');
const { authenticated, generateToken } = require('./security-utils');

const router = express.Router();

const email =
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail();

const password =
  check('password')
    .not().isEmpty()
    .withMessage('Please provide a password');

router.put('/', [email, password], asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 422, errors: errors.array() });
  }

  const { email, password } = req.body;
  const player = await PlayerRepository.findByEmail(email);
  if (!player.isValidPassword(password)) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['Invalid credentials'];
    return next(err);
  }
  const { jti, token } = generateToken(player);
  player.tokenId = jti;
  await player.save();
  res.json({ token, player: player.toSafeObject() });
}));

router.delete('/', [authenticated], asyncHandler(async (req, res) => {
  req.player.tokenId = null;
  await req.player.save();
  res.json({ message: 'success' });
}));

module.exports = router;
