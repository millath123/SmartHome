const mongoose = require('mongoose');
const vendorSchema = new mongoose.Schema({
    vendorName: {type:string,require:true},
    ownerName: {type:string,require:true},
    email: {type:string,require:true},
    phoneNumber: {type:string,require:true},
    password: {type:string,require:true},
    status:{type:string,require:true},
    otp:{type:string}
}, {timestamps:true,versionKey:false});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;