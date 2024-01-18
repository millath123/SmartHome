const mongoose = require('mongoose');


const banerSchema = new mongoose.Schema({

    image:String,
    advataisement:String,
    description:String,
    price:String,

});


const Baner = mongoose.model('Cart', banerSchema);
module.exports = Baner;