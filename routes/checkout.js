var express = require('express');
var router = express.Router();
const Checkout = require('../model/checkout');

router.get('/checkout',async(req, res) => {
    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });
    console.log(user);
    const checkoutItems = await Checkout.find({ userId: user._id });

    const checkoutIds = checkoutItems.map(item => item.checkoutIds);
    const checkoutData = await Checkout.find({ _id: checkoutData });
    res.render(path.join(__dirname, '../views/user/checkout'),{ checkout: checkoutIds, checkout: checkoutData })
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
//         userId: user._id,
//         name,
//         mobileNo,
//         email,
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

