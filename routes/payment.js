var express = require('express');
var router = express.Router();
const path = require("path");
const Product = require('../model/productmodel');
const Cart = require('../model/cartmodel');
const User = require('../model/usermodel');
const Profile = require('../model/profile');
const Order = require('../model/ordercollection');
const Razorpay =require ('razorpay');
require('dotenv').config();



router.get('/', async function (req, res, next) {

    res.render(path.join(__dirname, '../views/user/payment'));
});

router.get('/orderplaced', async function (req, res, next) {
    
    res.render(path.join(__dirname, '../views/user/orderplaced'));
});

router.post('/placeorder', async function (req, res, next) {
    try {
        const { userId, profileId, productId, cartId, paymentMethod } = req.body;

        console.log('Received data:', req.body);

        const newOrder = new Order({
            userId,
            profileId,
            productId,
            cartId,
            paymentMethod
        });

        await newOrder.save();

        res.status(200).send('Order placed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

/////razorpay method

var instance = new Razorpay({
    key_id: 'rzp_test_loT5kImmE5sM43',
    key_secret: 'QmRczEgUqbFjliBVuOFD6EqS',
  });

router.get('/razorpay', async function (req, res, next) {

    res.render(path.join(__dirname, '../views/user/razorpay'));
});

router.post('/create-razorpay-order',auth, async (req, res) => {
    try {
      const { orderId, amount } = req.body;
      const razorpayOptions = {
        key: process.env.PAY_KEY,
        amount: amount * 100,
        currency: 'INR',
        name: 'Your Company Name',
        description: 'Payment for Order',
        image: 'your_company_logo_url',
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '1234567890',
        },
      };
  
      res.json({ razorpayOptions });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

module.exports = router;
