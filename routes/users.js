var express = require('express');
var router = express.Router();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js')
var Inventory = require('../models/inventory.js')

router.get('/login', function(req, res, next) {
  res.render('login',{title:'login'});
});

router.get('/register', function(req, res, next) {
  res.render('register',{title:'register'});
});

router.get('/addInventory', function(req, res, next) {
  res.render('add',{title:'add'});
});

router.get('/search', function(req, res, next) {
  res.render('search',{title:'search'});
});

router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

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

passport.use(new LocalStrategy(function(username, password, done){
  User.findUser(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Please LOGIN'}),
  function(req, res) {
    res.redirect('/dashboard');
  });

  router.post('/add',passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Please LOGIN'}),
  function(req,res){
    var location = req.body.location;
    var serial = req.body.serial;
    var config = req.body.config;
    var model = req.body.model;

    var newInv = new Inventory({
      location : location,
      serial : serial,
      config : config,
      model : model
    });

    Inventory.createEntry(newInv,function(err,entry){
      if(err) throw err;

      console.log(entry);
    })

    res.redirect('/dashboard');
  })

  router.post('/search',function(req,res){
    var serial = req.body.serial;

    Inventory.findEntry(serial,function(err,entry){
      if(err) throw err;

      res.render('search',{'entry':entry});
      console.log(entry);
    })
  })

  router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','You are now logged out!');
    res.redirect('/users/login');
  })

module.exports = router;
