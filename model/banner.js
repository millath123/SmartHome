const mongoose = require('mongoose');


const banerSchema = new mongoose.Schema({
    bannerImage:String,
    bannerProduct:String,
    bannerAnnouncement:String,
    bannerDescription:String,
    bannerPrice:String,
});

const Banner = mongoose.model('Banner', banerSchema);
module.exports = Banner;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       