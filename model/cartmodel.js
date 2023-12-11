const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'productmodel',   
    },
    quantity:{
        type:Number,
        default:1,
    },
});


const Cart = mongoose.model('Category', cartSchema);
module.exports = Cart;