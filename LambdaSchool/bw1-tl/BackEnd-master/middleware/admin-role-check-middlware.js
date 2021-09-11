module.exports = role => {
  return function(req, res, next) {
    if (req.decodedJwt.role && req.decodedJwt.role === "admin") {
      next();
    } else {
      next("you don't have permission");
    }
  };
};
