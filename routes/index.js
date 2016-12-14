var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users/login')
});

router.get('/dashboard', function(req, res, next) {
  res.render('layout');
});


module.exports = router;
