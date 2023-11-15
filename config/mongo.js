const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const app=express()


mongoose.connect('mongodb://127.0.0.1:27017/SmartHome', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = router;