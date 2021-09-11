module.exports = (req, res) => {
  delete req.session.auth;
};
