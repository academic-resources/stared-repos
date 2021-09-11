module.exports = function(app) {
  const User = require('../controllers/userController');

  app.route('/login')
    .get(User.find_user)
    .post(User.login)


  app.route('/signup')
    .post(User.signin)
};
