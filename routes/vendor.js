var express = require('express');
var router = express.Router();
const path = require("path");
const bcrypt = require('bcrypt');
const Admin = require('../model/vendormodel');
const User = require('../model/usermodel');
const Product = require('../model/productmodel');
const isAuthenticated = require('../auth');

router.get('/register', async (req, res) => {
  
});
  
router.get('/login', isAuthenticated, function (req, res) {
    res.render(path.join(__dirname, '../views/user/login'));
});
  

module.exports = router;        
