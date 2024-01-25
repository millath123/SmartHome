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

        if (paymentMethod === 'cashOnDelivery') {
     
            console.log('Processing Cash on Delivery');
        } else if (paymentMethod === 'razorpay') {
            // Process Razorpay
            const { amount } = req.body; // Extract amount from the request body

            const razorpayOptions = {
                key: process.env.PAY_KEY, // Update with your actual environment variable
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

            return res.json({ razorpayOptions });
        } else {
            // Handle other payment methods if needed
            console.log('Processing other payment methods');
        }

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

// Route for rendering the Razorpay view
router.get('/razorpay', async function (req, res, next) {
    res.render(path.join(__dirname, '../views/user/razorpay'));
});

module.exports = router;
