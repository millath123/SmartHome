var express = require('express');
var router = express.Router();
const path = require("path");
const bcrypt = require('bcrypt');
const Admin = require('../model/adminmodel');
const User = require('../model/usermodel');
const Product = require('../model/productmodel');
const isAuthenticated = require('../auth');

require('dotenv').config();


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


router.get('/login', isAuthenticated, function (req, res) {
  res.render(path.join(__dirname, '../views/admin/login'));
});

router.get('/', isAuthenticated, async function (req, res) {
  try {
    const adminId = req.cookies.adminToken;

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(401).redirect('/admin/login');
    }

    res.render(path.join(__dirname, '../views/admin/index'), { admin });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching admin details');
  }
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

router.get('/logout', isAuthenticated, function (req, res) {
  res.clearCookie('adminToken');
  res.redirect('/');
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
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update the user's information
    user.fullName = fullName;
    user.phoneNumber = phoneNumber;
    user.email = email;

    await user.save();
    res.send({ ok: 'pp' })
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


router.delete('/products/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting product' });
  }
});

const cloudinary = require('../config/cloudinary')
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Category = require('../model/categorymodel');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});
const upload = multer({ storage: storage });



router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('editProductPage', { product });
  }  catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Error fetching product details');
  }
});

router.put('/products/:id', upload.array('images', 5), async (req, res) => {
  const productId = req.params.id;
  const {
    productName,
    productCategory,
    productColor,
    productPrice,
    productBrand,
    productQuantity,
    productDescription,
    productConnectivity
  } = req.body;

  try {
    const product = await Product.findById(productId);
  
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let imageUrls = product.productImage; 
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path)
      );

      const results = await Promise.all(uploadPromises);
      const newImageUrls = results.map((result) => result.secure_url);
      imageUrls = newImageUrls;
    }
    
    // Update product details
    product.productName = productName;
    product.productCategory = productCategory;
    product.productColor = productColor;
    product.productPrice = productPrice;
    product.productBrand = productBrand;
    product.productQuantity = productQuantity;
    product.productDescription = productDescription;
    product.productConnectivity = productConnectivity;
    product.productImage = imageUrls; // Update the images
    
    await product.save();
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product' });
  }
});


//// viwes
router.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('editProductPage', { product });
  }  catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Error fetching product details');
  }
});


router.get('/otp', (req, res) => {
  res.render(path.join(__dirname, '../views/user/mobileOTP'));
});


//// categry page

router.get('/category', async (req, res) => {
  const category = await Category.find();
  res.render('admin/category', { category })
}
);
router.get('/category', (req, res) => {
  res.render(path.join(__dirname, '../views/admin/category'));
});


router.delete('/category/:id', async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting category' });
  }
});


module.exports = router;        
