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
        const { userId, profileId, cartId, payment_method } = req.body;

        console.log('Received data:', req.body);

        if (payment_method === 'cash on delivery') {
            // Calculate the total amount based on the products in the cart
            const cart = await Cart.findById(cartId);
            const totalAmount = await calculateTotalAmount(cart.products);

            // Save order
            const newOrder = new Order({
                userId,
                profileId,
                cartId,
                payment_method,
                amount: totalAmount,
                products: cart.products, // Save products in the order
                orderDate: new Date(), // Add order date
            });

            await newOrder.save();

            // Clear the cart
            await Cart.findByIdAndDelete(cartId);

            res.status(200).json({ ok: 'ok' });
        } else if (payment_method === 'Razorpay') {
            console.log(req.body)
           
            const { userId, profileId, cartId, payment_method, paymentId } = req.body;
            // Calculate the total amount based on the products in the cart
            const cart = await Cart.findById(cartId);
            const totalAmount = await calculateTotalAmount(cart.products);
            // Process Razorpay
            const razorpayOptions = {
                key: process.env.PAY_KEY, // Update with your actual environment variable
                amount: totalAmount * 100, // Amount in paise
                currency: 'INR',
                name: 'Smart Home',
                description: 'Payment for Order',
                image: 'your_company_logo_url',
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '1234567890',
                },
            };

            return res.json({ razorpayOptions, totalAmount });
        } else {
            const { userId, profileId, cartId, payment_method, paymentId } = req.body;
             // Calculate the total amount based on the products in the cart
             const cart = await Cart.findById(cartId);
             const totalAmount = await calculateTotalAmount(cart.products);
 
             // Save order
             const newOrder = new Order({
                 userId,
                 profileId,
                 cartId,
                 payment_method,
                 amount: totalAmount,
                 products: cart.products, // Save products in the order
                 orderDate: new Date(), 
                 paymentId: paymentId// Add order date
             });
 
             await newOrder.save();
 
             // Clear the cart
             await Cart.findByIdAndDelete(cartId);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

async function calculateTotalAmount(products) {
    const productIds = products.map(product => product.productId);
    const productData = await Product.find({ _id: { $in: productIds } });

    const totalAmount = products.reduce((total, product) => {
        const matchingProductData = productData.find(data => data._id.toString() === product.productId.toString());
        const productTotal = matchingProductData.productPrice * product.quantity;
        return total + productTotal;
    }, 0);

    return totalAmount;
}

// Route for rendering the Razorpay view
router.get('/razorpay', async function (req, res, next) {
    res.render(path.join(__dirname, '../views/user/razorpay'));
});

module.exports = router;
