var express = require('express');
var router = express.Router();
const transporter = require('../servies/nodemailer');
const generateOTP = require('../servies/generateOtp');
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/usermodel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('../googleauth');
const Product = require('../model/productmodel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Cart = require('../model/cartmodel');
const Profile = require('../model/profile');

router.use(express.json());


router.get('/', async (req, res) => {
  try {
    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const cartItems = await Cart.findOne({ userId: user._id });

    if (!cartItems) {
      return res.status(200).render(path.join(__dirname, '../views/user/index'), { cart: [], product: [] });
    }

    const productIds = cartItems.products.map(product => product.productId);

    const productData = await Product.find({ _id: { $in: productIds } });

    res.render(path.join(__dirname, '../views/user/index'), { cart: cartItems.products, product: productData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});



/* GETusers listing. */


router.get('/register', async (req, res, next) => {
  res.render(path.join(__dirname, '../views/user/register'));
});


router.post('/send-otp', async (req, res) => {
  const email = req.body.email;
  const otp = generateOTP();


  const hashedOtp = await bcrypt.hash('' + otp, 10);
  console.log(hashedOtp);


  const mailOptions = {
    from: 'adilamillath@gmail.com',
    to: email,
    subject: 'OTP for Verification',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><meta charset="UTF-8"><meta content="width=device-width, initial-scale=1" name="viewport"><meta name="x-apple-disable-message-reformatting"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta content="telephone=no" name="format-detection"><title>New message</title> <!--[if (mso 16)]><style type="text/css"> a {text-decoration: none;} </style><![endif]--> <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> <!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml>
    <![endif]--><style type="text/css">.rollover:hover .rollover-first { max-height:0px!important; display:none!important; } .rollover:hover .rollover-second { max-height:none!important; display:inline-block!important; } .rollover div { font-size:0px; } u + .body img ~ div div { display:none; } #outlook a { padding:0; } span.MsoHyperlink,span.MsoHyperlinkFollowed { color:inherit; mso-style-priority:99; } a.es-button { mso-style-priority:100!important; text-decoration:none!important; } a[x-apple-data-detectors] { color:inherit!important; text-decoration:none!important; font-size:inherit!important; font-family:inherit!important; font-weight:inherit!important; line-height:inherit!important; } .es-desk-hidden { display:none; float:left; overflow:hidden; width:0; max-height:0; line-height:0; mso-hide:all; } .es-button-border:hover > a.es-button { color:#ffffff!important; }
    @media only screen and (max-width:600px) {*[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:left } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important }
    .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:14px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important }
    .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:inline-block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important }
    .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } }</style>
    </head> <body class="body" style="width:100%;height:100%;padding:0;Margin:0"><div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F6F6F6"> <!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f6f6f6"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F6F6F6"><tr><td valign="top" style="padding:0;Margin:0"><table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important"><tr class="es-visible-simple-html-only">
    <td class="es-stripe-html" align="center" style="padding:0;Margin:0"><table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px"><tr><td style="Margin:0;padding-top:40px;padding-right:20px;padding-bottom:40px;padding-left:20px;background-color:#182838" bgcolor="#182838" align="left"><table width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr>
    <td align="center" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:5px;padding-bottom:10px"><h1 style="Margin:0;font-family:'merriweather sans', 'helvetica neue', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:30px;font-style:normal;font-weight:normal;line-height:30px;color:#ffffff"><strong>Smart Home</strong> </h1></td></tr><tr><td align="center" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-bottom:5px"><h3 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:20px;font-style:normal;font-weight:normal;line-height:24px;color:#ffffff">Activate Your Account within 5 minutes</h3></td></tr><tr>
    <td align="center" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;padding-bottom:30px"><img class="adapt-img" alt="" width="520" src="https://cdt-timer.stripocdn.email/api/v1/images/vfA_ULwvzDb46O9iMam9D2IavjxmWv5v0S92vbrAoyw?l=1698474614997" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td></tr> <tr>
    <td align="center" style="padding:10px;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#ffffff;border-width:0px 0px 2px 0px;display:inline-block;border-radius:30px;width:auto"><a href="http://localhost:5006/users/active/${otp}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#333333;font-size:18px;padding:10px 20px 10px 20px;display:inline-block;background:#ffffff;border-radius:30px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #31CB4B;border-color:#ffffff">Active Now</a></span></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body> </html>`
  };

  res.cookie('email', email, {
    httpOnly: true,
  });


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Failed to send OTP.');
    }
    else {

      console.log(hashedOtp);
      res.cookie('otp', hashedOtp, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,

      });
      res.status(200).render(path.join(__dirname, '../views/user/register'), { sucsess: 'ok' })
    }
  });
});


router.get('/active/:otp', async (req, res) => {
  const urlOtp = req.params.otp;
  const storedOtpHash = req.cookies.otp;


  bcrypt.compare(urlOtp, storedOtpHash, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (result) {
      res.render('user/conformreg');
    } else {
      res.send('Activation failed');
    }
  });
});


//  set password and conform for reg

router.get('/conformreg', async(req, res) => {
  res.render('users/setpassword');
});

router.post('/set-password', async (req, res) => {
  const email = req.cookies.email;
  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const newPassword = req.body.newPassword;
  const confirmNewPassword = req.body.confirmNewPassword;
  const hashedPassword = await bcrypt.hash(newPassword, 10);


  if (newPassword !== confirmNewPassword) {
    return res.status(400).send('Passwords do not match.');
  }

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).send('Email is already in use. Please use a different email.');
    }
    const newUser = new User({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user to the database');
  }
});

///// login page

router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '../views/user/login'))
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).render(path.join(__dirname, '../views/user/conformreg'), { invalidmail: 'Invalid Email Address' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(200).render(path.join(__dirname, '../views/user/conformreg'), { notmatch: 'password not match' });
    }

    const user_token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
    user.token = user_token
    await user.save()
    res.cookie('user_token', user_token, { httpOnly: true });
    return res.redirect('/users/mobileotp');
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

////mobail OTP

router.get('/mobileotp', async (req, res) => {
  res.render(path.join(__dirname, '../views/user/mobileOTP'))
});

/// google authentication

router.get('/googleauth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/googleauth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log(req.user)
    res.redirect('/users')
  }
);

///// productdetail
router.get('/productdetail/:id', async (req, res) => {
  try {

    const productId = req.params.id.split(':')[0];
    const product = await Product.findById(productId);
    res.render(path.join(__dirname, '../views/user/productDetail'), { product });
  }
  catch (err) {
    res.status(500).json({ error: 'Error fetching product details' + err });
  }

});

// profile

router.get('/profile', async (req, res) => {
  const userToken = req.cookies.user_token;
  let user = await User.findOne({ token: userToken });

  const profile = await Profile.find({ userId: user._id });
  console.log(profile);

  res.render(path.join(__dirname, '../views/user/profile'), { profile })
});

router.post('/profile', async (req, res) => {
  const { name, mobileNo, email, pinCode, address, locality, city, state, saveAddressAs } = req.body;

  try {
    const existingUser = await Profile.findOne({ email });
    const userToken = req.cookies.user_token;
    let user = await User.findOne({ token: userToken });
    if (existingUser) {
      return res.status(400).send('This mail is already used');
    }

    const userProfile = new Profile({
      userId: user._id,
      name,
      mobileNo,
      email,
      pinCode,
      address,
      locality,
      city,
      state,
      saveAddressAs,
    });

    await userProfile.save();
    res.status(201).json(userProfile);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving user to the database');
  }
});


router.delete('/profile/:profileId', async (req, res) => {
  try {
      const profileId = req.params.profileId;
      await Profile.findOneAndDelete({ _id: profileId });
      res.status(204).send();
  } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting profile');
  }
});


router.put('/profile/:profileId', async (req, res) => {
  try {
      const profileId = req.params.profileId;
      const updatedData = req.body; 
      const updatedProfile = await Profile.findByIdAndUpdate(profileId, updatedData, { new: true });

      res.json({ success: true, profile: updatedProfile });
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


router.put('/profile/:profileId', async (req, res) => {
  try {
      const profileId = req.params.profileId;
      const updatedData = req.body; 
      const updatedProfile = await Profile.findByIdAndUpdate(profileId,updatedData, { new:true });

      res.json({ success: true, profile: updatedProfile });
  } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});


// router.put('/profile')

// Fetch user profile details by email
// router.get('/profile/:email', async (req, res) => {
//   const userEmail = req.params.email;

//   try {
//     const userProfile = await Profile.findOne({ email: userEmail });

//     if (!userProfile) {
//       return res.status(404).send('User profile not found');
//     }

//     res.json(userProfile);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching user profile');
//   }
// });




module.exports = router;

