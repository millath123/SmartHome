var express = require('express');
var router = express.Router();
const path = require ("path");
const Product = require('../model/productmodel');

router.get('/', function(req, res, next) {
  res.render(path.join(__dirname,'../views/admin/login'));
});

router.get('/product',async function (req, res, next) {
  const product = await Product.find()
    console.log(product);
  res.render(path.join(__dirname,'../views/user/product'), {product});
});


module.exports = router;
