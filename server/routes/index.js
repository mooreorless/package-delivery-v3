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
router.put('/update/details', ctrlFunctions.updateDetails);

// orders
// removed auth middleware due to it clashing with the frontend
router.get('/orders', ctrlFunctions.getUserOrders);
router.post('/orders/new', ctrlFunctions.placeOrder);
router.put('/update/jobstate', ctrlFunctions.updateJobState);

router.get('/singleOrder', ctrlFunctions.getSingleOrder);

// admin actions
router.get('/orders/current', ctrlFunctions.getCurrentOrderCount);
router.get('/orders/delivered', ctrlFunctions.getDeliveredCount);
router.get('/orders/awaiting', ctrlFunctions.getPlacedOrders);

router.get('/drivers/all', ctrlFunctions.getAllDrivers);
router.put('/orders/assign/driver', ctrlFunctions.assignDriver);

module.exports = router;
