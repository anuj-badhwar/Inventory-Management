var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');
var Inventory = require('../models/inventory.js');
var index = require('./index');
var auth = index.auth;

router.get('/addInventory', function(req, res, next) {

  res.render('add',{title:'add'});
});

router.post('/addInventory',
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
});

  router.post('/search',function(req,res){
    var serial = req.body.serial;

    Inventory.findEntry(serial,function(err,entry){
      if(err) throw err;

      res.render('search',{title:'search',user:req.user,entry:entry});
      console.log(entry);
   })
  })

  router.get('/search',function(req, res, next) {
    if(!req.isAuthenticated())
      res.send('NOT AUTHORISED');

    res.render('search',{title:'search'});
  });

  router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','You are now logged out!');
    res.redirect('/login');
  })

  /*function auth() {
  return function(req, res, next) {
    if(req.isAuthenticated())
      next();
    else
      res.send('UNAUTHORISED');
  }
};*/

module.exports = router;
