const nodemailer=require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 465,
    secure: true,
    auth:{
        user: 'adilamillath@gmail.com',
        pass:'zmft umhx riio iqnw'
    }
})

module.exports=transporter;