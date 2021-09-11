const mongoose = require('mongoose')

const User = mongoose.model('users')

exports.signin = function(req, res) {
  User.find({req.params.})
}