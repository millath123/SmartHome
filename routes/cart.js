var express = require('express');
var router = express.Router();
const path = require("path");
const Product = require('../model/productmodel');
const Cart = require('../model/cartmodel');
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');
const Profile = require('../model/profile');

// GET route to display the cart
router.get('/', async (req, res, next) => {
  try {
    const userToken = req.cookies.user_token;
    const user = await User.findOne({ token: userToken });
    
    // Use aggregate to fetch cart data along with product details
    const cartItems = await Cart.aggregate([
      {
        $match: { userId: user._id },
      },
      {
        $unwind: '$products',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'productData',
        },
      },
      {
        $addFields: {
          'products.productData': { $arrayElemAt: ['$productData', 0] },
        },
      },
      {
        $group: {
          _id: '$_id',
          userId: { $first: '$userId' },
          products: { $push: '$products' },
          __v: { $first: '$__v' },
        },
      },
    ]);

    res.render(path.join(__dirname, '../views/user/cart'), { cartItems: cartItems });

  } catch (error) {
    console.error('Error occurred:', error);
  }
});


// POST route to add a product to the cart
router.post('/addToCart', async (req, res) => {
  const productId = req.body.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });

    
    let cart = await Cart.findOne({ userId: user._id });

    if (cart) {
      
      const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    }
     else {
      cart = new Cart({
        userId: user._id,
        products: [{ productId, quantity: 1 }],
      });
    }

    await cart.save();
    res.status(200).json({ success: true, message: 'Product added to cart' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ error: 'Failed to add product to cart' });
  }
});


router.delete('/delete/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {

    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });

    await Cart.updateOne(
      { userId: user._id },
      { $pull: { products: { productId } } }
    );

    res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'Failed to delete' });
  }
});

router.put('/:productId/:quantity', async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);

    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });

    const cart = await Cart.findOne({ userId: user._id });

    if (cart) {
      const productIndex = cart.products.findIndex(product => product.productId.toString() === productId);

      if (productIndex !== -1) {
        cart.products[productIndex].quantity = quantity;

        await cart.save();

        res.status(200).json({ success: true, message: 'Quantity updated in the database' });
      } else {
        res.status(404).json({ error: 'Product not found in the cart' });
      }
    } else {
      res.status(404).json({ error: 'Cart not found for the user' });
    }
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
