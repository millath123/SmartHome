const mongoose = require('mongoose');

const orderplacedSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
    },
    profileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profile',
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
    },
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
    },
    paymentMethod:String,
    orderId:String
});


const Order = mongoose.model('Order', orderplacedSchema);
module.exports = Order;

