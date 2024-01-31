const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'usermodel',
    },
   cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cartmodel',   
    },
    
    profileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profile',   
    },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;