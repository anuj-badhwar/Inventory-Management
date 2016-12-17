var express = require('express');
var fs=require('fs');
var router = express.Router();

var Inventory = require('../models/inventory.js')

router.get('/add', function(req, res, next) {
  res.render('add',{title:'add'});
});

router.post('/add',function(req,res){
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

  res.redirect('add');

})

module.exports = router;
