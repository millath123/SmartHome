var express = require('express');
var router = express.Router();
const path = require ("path");
const Product = require('../model/productmodel');

router.get('/', function(req, res, next) {
  res.render(path.join(__dirname,'../views/user/cart'));
});

module.exports = router;