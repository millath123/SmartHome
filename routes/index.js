var express = require('express');
var router = express.Router();
const path = require ("path");

router.get('/', function(req, res, next) {
  res.render(path.join(__dirname,'../views/admin/index'));
});



module.exports = router;
