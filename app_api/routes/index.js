var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlFunctions = require('../controllers/functionService');


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlFunctions.register);
router.post('/login', ctrlFunctions.login);

//orders
router.post('/orders', ctrlFunctions.placeOrder);
router.post('/orders/new', ctrlFunctions.placeOrder);

module.exports = router;
