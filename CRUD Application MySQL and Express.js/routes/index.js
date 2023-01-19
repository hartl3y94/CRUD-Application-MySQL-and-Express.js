var express = require('express');
var router = express.Router();
var dbConn = require('../lib/db');

// display add ipaddress page
router.get('/', function(req, res, next) {
  // respond with add.ejs
  res.render('index', {
    name: '',
    city: ''
  })
});

module.exports = router;
