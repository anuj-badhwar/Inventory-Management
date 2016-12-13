var express = require('express');
var router = express.Router();

var User = require('../models/user.js')

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  console.log(name + username + email + password);
  var newUser = new User({
    name : name,
    username : username,
    email : email,
    password : password
  })

  User.createUser(newUser,function(err,user){
    if(err) throw err;
    console.log(user);
  })

  res.redirect('/users/login');
});


module.exports = router;
