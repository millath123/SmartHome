const mongoose = require('mongoose');


const banerSchema = new mongoose.Schema({
    bannerImage:String,
    bannerProduct:String,
    bannerAnnouncement:String,
    bannerDescription:String,
    bannerPrice:String,
});

const Baner = mongoose.model('Cart', banerSchema);
module.exports = Baner;