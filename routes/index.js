var express = require('express');
var fs=require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users/login');
});

router.get('/dashboard', function(req, res, next) {
  res.render('layout',{title:'Dashboard'});
});

module.exports = router;
