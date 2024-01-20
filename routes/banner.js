const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const path = require("path");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Banner = require('../model/banner');



router.get('/',async function(req, res, next) {
    res.render(path.join(__dirname,'../views/admin/banner'));
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const parser = multer({ storage: storage });

router.post('/addBanner', parser.single('image'), async (req, res) => {
    try {
        const { bannerProduct, bannerAnnouncement, bannerDescription, bannerPrice } = req.body;

        const bannerImage = req.file ? req.file.path : ''; 

        const newBanner = new Banner({
            bannerImage,
            bannerProduct,
            bannerAnnouncement,
            bannerDescription,
            bannerPrice,
        });

        const savedBanner = await newBanner.save();

        res.json(savedBanner);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;