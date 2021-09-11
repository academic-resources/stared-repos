const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const { jwtConfig: { secret, expiresIn } } = require('../../config');
const PlayerRepository = require('../../db/player-repository');

function generateToken(player) {
  const data = {
    name: player.name,
  };
  const jwtid = uuid();

  return {
    jti: jwtid,
    token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
  };
}

function restorePlayer(req, res, next) {
  const { token } = req;

  if (!token) {
    return next({ status: 401, message: 'no token' });
  }

  return jwt.verify(token, secret, null, async (err, payload) => {
    if (err) {
      err.status = 403;
      return next(err);
    }

    const tokenId = payload.jti;

    try {
      req.player = await PlayerRepository.findByTokenId(tokenId);
    } catch (e) {
      return next(e);
    }

    if (!req.player.isValid()) {
      return next({ status: 404, message: 'session not found' });
    }

    next();
  });
}

const authenticated = [bearerToken(), restorePlayer];

module.exports = { generateToken, authenticated };
