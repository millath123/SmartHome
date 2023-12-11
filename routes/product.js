const express = require('express');
const cloudinary = require('../config/cloudinary')
const multer = require('multer');
const Product = require('../model/productmodel');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.array('images', 5), async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).render(path.join(__dirname, '../views/admin/product'),{ noimg: 'ok' });
    }
    
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );

    const results = await Promise.all(uploadPromises);
    const imageUrls = results.map((result) => result.secure_url);

    const {
      productName,
      productDescription,
      productCategory,
      productBrand,
      productColor,
      productConnectivity,
      productPrice,
      productQuantity,

    } = req.body;

    const newProduct = new Product({
      productName,
      productDescription,
      productCategory,
      productBrand,
      productColor,
      productConnectivity,
      productPrice,
      productQuantity,
      productImage: imageUrls,
    });

     newProduct.save();
     res.redirect('../admin/product');
    
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Error adding the product' });
  }
});



module.exports = router;
