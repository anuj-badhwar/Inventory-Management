var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');
var Inventory = require('../models/inventory.js');

router.get('/addInventory',function(req, res, next){
  res.render('add',{title:'add'});
});

router.post('/addInventory', function(req,res){

    var newInv = new Inventory({
      serial : req.body.serial,
      rack:req.body.rack,
      location:req.body.location,
      model:req.body.model,
      asset:req.body.asset,
      server:req.body.server,
      Make:req.body.Make,
      AMC:req.body.AMC,
      VSH:req.body.VSH,
      virtual:req.body.virtual,
      VSN:req.body.VSN,
      IP:req.body.IP,
      DCIB:req.body.DCIB,
      Host:req.body.Host,
      OS:req.body.OS,
      License:req.body.License,
      Owner:req.body.Owner,
      LAN:req.body.LAN,
      Config:req.body.Config,
      Storage:req.body.Storage,
      RAID:req.body.RAID,
      Backup:req.body.Backup
    });

    Inventory.createEntry(newInv,function(err,entry){
      if(err) throw err;

      console.log(entry);
    })

    req.flash('success','Details added to Database!');
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
