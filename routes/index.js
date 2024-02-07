var express = require('express');
var router = express.Router();
const path = require ("path");
const Product = require('../model/productmodel');
const Cart = require('../model/cartmodel');
const User = require('../model/usermodel');



router.get('/',async function(req, res, next) {

  res.render(path.join(__dirname,'../views/user/index'));
});

router.get('/product',async function (req, res, next) {
  // const userToken = req.cookies.user_token;
  // let user = await User.findOne({ token: userToken });
  
  // const cartItems = await Cart.find({ userId: user._id });

  // const productIds = cartItems.map(item => item.productId);
  // const productData = await Product.find({ _id: productIds });
const product = await Product.find()

  res.render(path.join(__dirname,'../views/user/product'), {product });
});


module.exports = router;
