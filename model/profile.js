const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    name:String,
    mobileNo: String,
    email:String,
    pinCode:String,
    address:String,
    locality:String,
    city:String,
    state:String,
    saveAddressAs:String,
});


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;