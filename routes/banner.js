const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Banner = require('../model/banner');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'banners',
        format: async (req, file) => 'png', 
        public_id: (req, file) => `banner_${Date.now()}`, 
    },
});

const parser = multer({ storage: storage });

router.post('/addBanner', parser.single('image'), async (req, res) => {
    try {
        const { advataisement, description, price } = req.body;

        const image = req.file ? req.file.path : ''; 

        const newBanner = new Banner({
            bannerImage,
            bannerAnnouncement,
            bannerDescription,
            bannerProduct,
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
