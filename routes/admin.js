var express = require('express');
var router = express.Router();
const path = require("path");
const bcrypt = require('bcrypt');
const Admin = require('../model/adminmodel');
const User = require('../model/usermodel');
const cloudinary = require('../config/cloudinary');
const Product = require('../model/productmodel');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

// Example usage in a route
router.post('/upload', upload.single('file'), (req, res) => {
  // Handle the file upload logic
});




// Rewgistration of admin

// router.get('/register', async (req, res) => {
//   const adminEmail = process.env.ADMIN_EMAIL;
//   const adminPassword = process.env.ADMIN_PASSWORD;

//   const hashedPassword = await bcrypt.hash(adminPassword, 10);



//     const newAdmin = new Admin({
//       email:adminEmail,
//       password: hashedPassword
//     });
//     await newAdmin.save();

// });


router.get('/login', function (req, res, next) {
  res.render(path.join(__dirname, '../views/admin/login'));
});

router.get('/', function (req, res, next) {
  res.render(path.join(__dirname, '../views/admin/index'));
  if (!req.cookies.adminToken) {
    redirect('/login')
  }
  const userId = req.cookies.adminToken;


});

/// admin login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log(email, password);
    const savedAdmin = await Admin.findOne({ email: email });

    if (savedAdmin) {
      const matchPass = await bcrypt.compare(password, savedAdmin.password);
      if (matchPass) {
        res.cookie('adminToken', savedAdmin._id.toString());
        res.redirect('/admin')
      }
      else {
        res.send('Wrong Password or EmailId')
      }
    }

  } catch (error) {

    console.error(error);
    res.status(500).send('Error saving user.');
  }
});

// create users list

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.render('admin/users', { users })

}
);


// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user.');
  }
});



router.put('/users/:id', async (req, res) => {

  const userId = req.params.id;
  const { fullName, phoneNumber, email } = req.body;

  try {

    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update the user's information
    user.fullName = fullName;
    user.phoneNumber = phoneNumber;
    user.email = email;

    await user.save();
    res.send({ok:'pp'})

  }

  catch {
    console.error(error);
    res.status(500).send('Error updating user');
  }

});

// Product page 
router.get('/product', async (req, res) => {
  const product = await Product.find();
  res.render('admin/product', { product })
}
);








module.exports = router;        
