module.exports = (req, res, user) => {
  req.session.auth = { userId: user.id };
};
