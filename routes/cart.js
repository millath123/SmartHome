var express = require('express');
var router = express.Router();
const path = require("path");
const Product = require('../model/productmodel');
const Cart = require('../model/cartmodel');
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');



router.get('/', async (req, res, next) => {
  try {
    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });
    
    const cartItems = await Cart.find({ userId: user._id });

    const productIds = cartItems.map(item => item.productId);
    const productData = await Product.find({ _id: productIds });

    res.render(path.join(__dirname, '../views/user/cart'), { cart: cartItems, product: productData });

  } catch (error) {
    console.error('Error occurred:', error);
  }
});

///add to cart

router.post('/addToCart', async (req, res) => {
  const productId = req.body.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });
    const cart = new Cart({
      userId: user._id,
      productId: productId,
      quantity: 1
    })
    await cart.save();
    res.status(200).render(path.join(__dirname, '../views/user/cart'),{ cartadd : 'ok' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});

///delete from cart
router.delete('/delete/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });

    await Cart.findOneAndDelete({ userId: user._id, productId });
    res.status(200).json({ message: 'successfully deleted' });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'failed to delete' });
  }
});

module.exports = router;