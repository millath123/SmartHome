// const express = require('express');
// const passport = require('passport');
// const session = require('cookie-session');
// require('./googleauth');
// const path = require("path");


// const router = express.Router();

// router.use(express.json());
// router.use(express.static(path.join(__dirname, 'client')));

// function isLoggIn(req, res, next) {
//     res.user ? next() : res.sendStatus(401);
// }

// // router.use(cookieSession({
// //     name: 'google-auth-session',
// //     keys: ['key1', 'key2']
// // }));

// //   const port = process.env.PORT || 4000

// router.get("/register", (req, res) => {
//     res.render(path.join(__dirname, '../views/uesr/register'))
// })



// router.get('/googleauth/google',
//     passport.authenticate('google', { scope: ['email', 'profile'] }));
            
// router.get('/googleauth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/googleauth/protected',
//         failureRedirect: '/googleauth/google/failure',
//     }),
// );


// router.get("/googleauth/protected", isLoggIn , (req, res) => {    
//     res.send(`Welcome ${req.user.email}`)
// });


// router.use(session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }))

// router.use(passport.initialize());
