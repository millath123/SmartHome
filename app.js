var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const adminrouter = require('./routes/admin');
const mongos = require('./config/mongo');
const cloudinary = require('./config/cloudinary');
const productroutes = require('./routes/product');
const categoryroutes = require('./routes/category');
const cartroutes = require('./routes/cart');
const checkoutroutes = require('./routes/checkout');

const paymentroutes = require('./routes/payment');

// const profileroutes = require('./routes/profile');



const googleauthrouter = require('./routes/googleauth');
const passport = require('passport');
const session = require('express-session');

const app = express();


app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: false
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));                                                                                                                                                                                                                                                                                                                                  

app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminrouter);
app.use('/mongo',mongos);
app.use('/product',productroutes);
app.use('/category',categoryroutes);
app.use('/cart',cartroutes);
app.use('/',checkoutroutes);
app.use('/payment',paymentroutes);


// app.use('/profile',profileroutes);



 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
