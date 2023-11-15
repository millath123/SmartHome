const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productImage: [String],
    productName: String,
    productDescription: String,
    productCategory: String,
    productBrand: String,
    productConnectivity: String,
    productColor: String,
    productPrice: String,
    productQuantity: String,
});


// // Middleware to upload images to Cloudinary before saving the product
// productSchema.pre('save', async function (next) {
//     try {
//       // Check if product images are modified or newly added
//       if (this.isModified('productImage') || this.isNew) {
//         // Upload each image to Cloudinary
//         const uploadPromises = this.productImage.map(async (image) => {
//           const result = await cloudinary.uploader.upload(image, { folder: 'products' });
//           return result.secure_url;
//         });
  
//         // Wait for all uploads to complete
//         this.productImage = await Promise.all(uploadPromises);
//       }
  
//       // Continue with the save process
//       next();
//     } catch (error) {
//       next(error);
//     }
//   });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
