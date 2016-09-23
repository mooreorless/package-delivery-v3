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
router.get('app/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('app/register', ctrlFunctions.register);
router.post('app/login', ctrlFunctions.login);

//orders
router.get('app/orders', ctrlFunctions.getUserOrders);
router.post('app/orders/new', ctrlFunctions.placeOrder);

module.exports = router;
