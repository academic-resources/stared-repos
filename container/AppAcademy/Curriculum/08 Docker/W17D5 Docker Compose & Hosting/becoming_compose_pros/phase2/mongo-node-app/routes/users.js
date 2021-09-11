var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec(function (err, users) {
    if(err){
      res.render('error', { message: err.message, error: err });
    }
    res.render('userlist', { users: users });
  });
});

/* SHow Create User Form */
router.get('/create', function(req,res,next){
  res.render('userform');
});

/* Get data from User form */
router.post('/create', function(req,res,next){
  var user = User({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  user.save(function(err){
    if(err){
      res.render('error', {message: err.message, error: err});
    }
    res.redirect('/users');
  });
});

module.exports = router;
