const bearerToken = require("express-bearer-token");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const db = require("./db/models");
const { User } = db;

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign({ data: userDataForToken }, secret, {
    expiresIn: parseInt(expiresIn, 10),
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req;

  if (!token) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    const { id } = jwtPayload.data;

    try {
      req.user = await User.findByPk(id);
    } catch (e) {
      e.status = 401;
      return next(e);
    }

    if (!req.user) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }

    return next();
  });
};

const requireAuth = [bearerToken(), restoreUser];
module.exports = { getUserToken, requireAuth };
