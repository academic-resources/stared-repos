const db = require('./db/models')

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id
  }
}

const restoreUser = async (req, res, next) => {
  if (req.session.auth) {
    const { userId } = req.session.auth;
    try {
      const user = await db.User.findByPk(userId);
      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next()
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
}

const logoutUser = (req, res) => {
  delete req.session.auth
  // res.locals.authenticated = false;
}

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/users/login')
  }
  return next();
}

const getRouteUserId = (req) => {
  return parseInt(
    req.originalUrl
      .match(/users\/(?<user>\d+)/)
      .groups.user
    , 10);
}

const checkUserRouteAccess = (req, res, next) => {
  const routeUserId = getRouteUserId(req);
  const userId = parseInt(res.locals.user.id, 10);
  if(routeUserId === userId) {
    next();
  }
  else {
    //redirect to their own user page if not a match
    res.redirect(`/users/${userId}`);
  }
}

module.exports = {
  loginUser,
  restoreUser,
  logoutUser,
  requireAuth,
  checkUserRouteAccess,
  getRouteUserId
};
