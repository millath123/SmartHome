const express = require('express');
const cloudinary = require('../config/cloudinary')
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Category = require('../model/categorymodel');
const router = express.Router();

router.get('/',  async (req, res) => {
  const category = await Category.find()
  console.log(category);
  res.render(path.join(__dirname, '../views/user/category'), { category })
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).render(path.join(__dirname, '../views/admin/category'), { noimg: 'ok' });
    }

    const result = await cloudinary.uploader.upload(file.path);
    const imageUrl = result.secure_url;
    const {
      categoryName,
    } = req.body;

    const newCategory = new Category({
      categoryName,
      categoryImage: imageUrl,
    });

    newCategory.save();
    res.redirect('../admin/category');

  } catch (error) {
    console.error('Error adding category:', error);                                                                                               
    res.status(500).json({ error: 'Error adding the category' });
  }
});

// //category edit
router.get('/:categoryId/edit', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    res.render('editCategory', { category });
  } catch (error) {
    console.error('Error fetching category for edit:', error);
    res.status(500).json({ error: 'Error fetching category for edit' });
  }
});

router.put('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { categoryName, categoryImage } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      categoryName,
      categoryImage,
    }, { new: true });

    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Error updating category' });
  }
});




module.exports = router;
