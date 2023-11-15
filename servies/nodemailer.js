const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'adilamillath@gmail.com',
        pass:'dehs axdm myca frlg'
    }
})

module.exports=transporter;