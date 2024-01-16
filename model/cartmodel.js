const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
    },
    productId:[String],
    quantity:[String],
});


const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;