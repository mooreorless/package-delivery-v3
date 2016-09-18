var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  console.log(req.body);
  console.log('register being called');
  var user = new User();

  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.streetNumber = req.body.streetNumber;
  user.streetName = req.body.streetName;
  user.suburb = req.body.suburb;
  user.postCode = req.body.postCode;
  user.isDriver = false;
  user.isAdmin = false;

  emailDomain = req.body.email.split('@');
  console.log(emailDomain[1]);

  if (emailDomain[1] == 'onthespot.com'){
    user.isDriver = true;
  }

  if (req.body.email == 'admin@onthespot.com'){
    user.isAdmin = true;
  }

  user.setPassword(req.body.password);

  console.log(user);
  user.save(function(err) {
    if (err){
      console.log(err);
    }
    console.log('save being called');
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.placeOrder = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  console.log(req.body);
  console.log('Placing Order');
  var order = new Order();

  order.userID = req.body.userID;
  order.pickUp = req.body.pickUp;
  order.dropOff = req.body.dropOff;
  order.notes = req.body.notes;
  order.isFragile = req.body.isFragile;
  order.isExpress = req.body.isExpress;
  order.state = req.body.state;

  order.save(function(err) {
    if (err){
      console.log(err);
    }
    console.log('save being called');
    res.status(200);
    // var token;
    // token = user.generateJwt();
    // res.status(200);
    // res.json({
    //   "token" : token
    // });
  });
};

module.exports.getUserOrders = function(req, res){
  Order.find({ 'userID': req.query.user }, 'pickUp dropOff notes', function (err, orders) {
    if (err) console.log(err);
    console.log(orders); // Space Ghost is a talk show host.
    res.send(orders);
  });
};

