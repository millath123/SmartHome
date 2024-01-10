var express = require('express');
var router = express.Router();
const path = require("path");
const Product = require('../model/productmodel');
const Cart = require('../model/cartmodel');
const User = require('../model/usermodel');
const Checkout = require('../model/checkout');
const Profile = require('../model/profile');


router.get('/checkout', async (req, res) => {
    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });
    console.log(user);     

    const cartItems = await Cart.find({ userId: user._id });
    console.log(cartItems);
    const productIds = cartItems.map(item => item.productId);
    const productData = await Product.find({ _id: productIds });
    console.log(productData);
    
  
    const profile = await Profile.findOne({ userId: user._id });
    console.log(profile);

    // const checkoutItems = await Checkout.find({ userId: user._id });
    // console.log(checkoutItems);
    // const checkoutIds = checkoutItems.map(item => item.checkoutIds);

    // const specificCheckoutData = await Checkout.find({ _id: checkoutIds });
    // console.log(specificCheckoutData);

    res.render(path.join(__dirname, '../views/user/checkout'), { cart: cartItems, product: productData, profile });
});


//   router.post('/checkout', async (req, res) => {
//     const { name, mobileNo, email, pinCode, address, locality, city, state, saveAddressAs } = req.body;  
//     try {
//       const existingUser = await Checkout.findOne({ email });

//       if (existingUser) {
//         return res.status(400).send('Email is already in use. Please use a  different email.');
//       }
//       const userToken = req.cookies.user_token;
//       let user = await User.findOne({ token: userToken });
//       const userCheckout  = new Checkout({
//         userId: user._id,33+-3333 email,
//         pinCode,
//         address,
//         locality,
//         city,
//         state,
//         saveAddressAs,
//       });

//       await userCheckout.save();
//       res.status(201).json(userCheckout); 
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error saving user to the database');
//     }
//   });

//  Fetch user profile details by email
//   router.get('/profile/:email', async (req, res) => {
//     const userEmail = req.params.email;

//     try {
//       const userProfile = await Profile.findOne({ email: userEmail });

//       if (!userProfile) {
//         return res.status(404).send('User profile not found');
//       }

//       res.json(userProfile);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error fetching user profile');
//     }
//   });

module.exports = router;

