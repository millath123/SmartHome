const mongoose = require('mongoose');


const checkoutSchema = new mongoose.Schema({
    categoryName:String,
    categoryImage: String,
});


const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;