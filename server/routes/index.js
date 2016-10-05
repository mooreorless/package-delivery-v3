var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var SECRET = require('../config/jwt');

var auth = jwt({
  secret: SECRET.TOKEN_SECRET,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlFunctions = require('../controllers/functionService');


// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlFunctions.register);
router.post('/login', ctrlFunctions.login);

// orders
// add in auth middleware
router.get('/orders', auth, ctrlFunctions.getUserOrders);
router.post('/orders/new', auth, ctrlFunctions.placeOrder);

module.exports = router;
