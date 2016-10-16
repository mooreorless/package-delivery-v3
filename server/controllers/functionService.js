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

  passport.authenticate('local', { failureFlash: true }, function(err, user, info){
    var token;

		// If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
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
  order.pickUpNumber = req.body.pickUpNumber;
	order.pickUpName = req.body.pickUpName;
	order.pickUpSuburb = req.body.pickUpSuburb;
	order.pickUpPostcode = req.body.pickUpPostcode;
  order.dropOffNumber = req.body.dropOffNumber;
	order.dropOffName = req.body.dropOffName;
	order.dropOffSuburb = req.body.dropOffSuburb;
	order.dropOffPostcode = req.body.dropOffPostcode;
  order.notes = req.body.notes;
  order.pickUpDate = req.body.pickUpDate;
  order.isFragile = req.body.isFragile;
  order.isExpress = req.body.isExpress;
  order.state = req.body.state;
  // order.driver = 'jono';

  if (Math.random() > 0.5){
    order.driver = 'jono';
  }
  else{
    order.driver = 'marco';
  }

  console.log(order);

  order.save(function(err) {
    if (err){
      console.log(err);
      res.json({
        error:err
      });
    } else {
			console.log('order saved');
			res.sendStatus(200);
      // res.json({
      //   fuck:'fuck'
      // });
		}
  });
};

module.exports.updateDetails = function (req, res) {
	console.log(req.body);
	User.findOneAndUpdate({_id : req.body._id}, req.body, {multi:false}, function(err,doc){
		if(err) console.log(err);
		console.log(doc);
	});
};

module.exports.getUserOrders = function(req, res){
  var userEmail = req.query.user.split('@');
	//if logged in user is a driver
	if ((userEmail[1] == 'onthespot.com') && (userEmail[0] != 'admin')){
		console.log('fetching orders assigned to ' + req.query.user);
		Order.find({ 'driver': userEmail[0] }, function (err, orders) {
			if (err) console.log(err);
			console.log(orders);
			res.send(orders);
		});
	}
	else{
		console.log('fetching orders for ' + req.query.user);
		Order.find({ userID: req.query.user }, function (err, orders) {
			if (err) {
				res.status(404).json(err);
			}
			console.log(orders);
			res.send(orders);
		});
	}
};

module.exports.getSingleOrder = function(req, res){
  // console.log(req.query.orderID);
  Order.findOne({ _id: req.query.orderID }, function (err, order) {
    // if (err) console.log(err);
    res.send(order);
  });
};

