var express = require('express');
var router = express.Router();
const path = require("path");
const Product = require('../model/productmodel');
const Cart = require('../model/cartmodel');
const User = require('../model/usermodel');
const Profile = require('../model/profile');


router.get('/checkout', async (req, res) => {
    try {
      const userToken = req.cookies.user_token;
      let user = await User.findOne({ token: userToken });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const cartItems = await Cart.findOne({ userId: user._id });
  
      if (!cartItems) {
        return res.status(200).render(path.join(__dirname, '../views/user/checkout'), { cart: [], user, profile: null, grandTotal: 0 });
      }
  
      const productIds = cartItems.products.map(product => product.productId);
  
      const productData = await Product.find({ _id: { $in: productIds } });
      const profile = await Profile.find({ userId: user._id });
  
      let grandTotal = 0;
  
      // Merge product details into cartItems and calculate total price
      const mergedCartItems = cartItems.products.map(product => {
        const matchingProductData = productData.find(data => data._id.toString() === product.productId.toString());
        const total = matchingProductData.productPrice * product.quantity;
        grandTotal += total;
        return { ...product, productData: matchingProductData, total };
      });
  
      console.log(mergedCartItems);
  
      res.render(path.join(__dirname, '../views/user/checkout'), { cart: mergedCartItems, user, profile, grandTotal });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  

router.delete('/checkout/:profileId', async (req, res) => {
    try {
        const profileId = req.params.profileId;
        await Profile.findOneAndDelete({ _id: profileId });
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting profile');
    }
  });

  

//   router.post('/checkout', async (req, res) => {
//     const { name, mobileNo, email, pinCode, address, locality, city, state, saveAddressAs } = req.body;  
//     try {
//   const existingUser = await Checkout.findOne({ email });

//       if (existingUser) {
//         return res.status(400).se`d('Email is already in use. Please use a  different email.');
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

