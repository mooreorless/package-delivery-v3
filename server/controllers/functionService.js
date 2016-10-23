var passport = require('passport');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Order = mongoose.model('Order');

var sendJSONresponse = function(res, status, content) {
  res.status(status).json(content);
};

/*
Registers the user into the by adding them to the database and generating a jwt to validate them when needed
 */
module.exports.register = function(req, res) {

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

	var userEmail = (req.body.email).split('@');

	var driverOrAdmin = function(username, domain) {
		if (domain.includes('onthespot.com')) {
			user.isDriver = true;
		} else if (username.includes('admin')) {
			user.isAdmin = true;
		}
	};
	driverOrAdmin.apply(null, userEmail);

  user.setPassword(req.body.password);

  console.log(user);
  user.save(function(err) {
    if (err){
	    res.status(500).json(err);
    } else {
	    var token;
	    token = user.generateJwt();
	    res.status(200).json({ "token": token });
    }


    // Token used to continually validate the user post registration
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
};

/*
The function used to log the user into website
 */
module.exports.login = function(req, res) {

  passport.authenticate('local', { failureFlash: true }, function(err, user, info){
    var token;

		// If Passport throws/catches an error, send the error status code
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
      // If user is not found, send the error status code
      res.status(401).json(info);
    }
  })(req, res);
};

/*
Places an order into the database by adding the
 */
module.exports.placeOrder = function(req, res) {

	console.log('Placing Order');
  var order = new Order();

  order.userID = req.body.userID;
  order.userName = req.body.userName;
  order.pickUpNumber = req.body.pickUpNumber;
	order.pickUpName = req.body.pickUpName;
	order.pickUpSuburb = req.body.pickUpSuburb;
	order.pickUpPostcode = req.body.pickUpPostcode;
  order.dropOffNumber = req.body.dropOffNumber;
	order.dropOffName = req.body.dropOffName;
	order.dropOffSuburb = req.body.dropOffSuburb;
	order.dropOffPostcode = req.body.dropOffPostcode;
  order.notes = req.body.notes;
  order.isFragile = req.body.isFragile;
  order.isExpress = req.body.isExpress;

  order.state = req.body.state;
  // order.driver = 'jono';

  // Distribution of the orders between the drivers
  if (Math.random() > 0.5){
    order.driver = 'jono';
  }
  else{
    order.driver = 'marco';
  }

  order.save(function(err) {
    if (err){
      console.log(err);
      res.json({
        error:err
      });
    } else {
			console.log('order saved');
			res.sendStatus(200);
		}
  });
};

/*
Updates the users details they wish to update
 */
module.exports.updateDetails = function (req, res) {
	User.findOneAndUpdate({ _id : req.body._id}, req.body, {multi:false, new:true}, function(err,doc){
		if(err) {
      console.log(err);
    }
    var token;
    token = doc.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
	});
};

/**
 * Updates the state of the job
 * @param req
 * @param res
 */

module.exports.updateJobState = function(req, res){
    // update job state
    // change the created at
    console.log(req.body);
  Order.findOneAndUpdate({_id:req.body._id}, req.body, {mutli:false, new:true}, function(err, doc){
    if(err) {
      res.status(500).json(err);
    }
    res.status(200).json({ job: doc });
  });
};

/**
 * Sends a response of the orders given the login detials of the user
 * @param req
 * @param res
 */
module.exports.getUserOrders = function(req, res){
  var user = JSON.parse(req.query.user);
  var userEmail = user.email.split('@');
  // console.log(req.query.user.);
	//if logged in user is a driver
	if ((userEmail[1] == 'onthespot.com') && (userEmail[0] != 'admin')){
		console.log('fetching orders assigned to ' + req.query.user);
		Order.find({ driver: userEmail[0].toLowerCase() }, function (err, orders) {
			if (err) console.log(err);
			console.log(orders);
			res.send(orders);
		});
	}
	else{
		console.log('fetching orders for ' + req.query.user);
		Order.find({ userID: user._id }, function (err, orders) {
			if (err) {
				res.status(404).json(err); // Error in case the server does not reply
			}
			console.log(orders);
			res.send(orders);
		});
	}
};

/*
Retrieves a single order from the database given who is logged in
 */
module.exports.getSingleOrder = function(req, res){
  Order.findOne({ _id: req.query.orderID }, function (err, order) {
    if (err) {
    	console.log(err);
    }
    else{
      res.send(order);
    }
  });
};

module.exports.markJobAsSeen = function(req, res){
  Order.findOneAndUpdate({ _id:req.body._id}, {seenByDriver: true}, function (err, order){
    if (err) {
      console.log(err);
    }
    else{
      console.log('job marked as seen');
      res.send(order);
    }
  });
};

/* Driver Assignment */

/*
  Get all drivers
 */
module.exports.getAllDrivers = function(req, res) {
	User.find({ isDriver: true, isAdmin: false }, function(err, drivers) {
		if (!err) {
			res.status(200).json(drivers);
		} else {
			res.status(500).json({ message: err });
		}
	});
};

/*
	Assign driver
*/
module.exports.assignDriver = function(req, res) {
	Order.findOneAndUpdate({ _id: req.body._id }, { driver: req.body.driverName }, { new: true }, function(err, assignedDriver) {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(200).json(assignedDriver);
		}
	});
};

/* 
  Check assigned jobs count per driver
*/
module.exports.getJobsForDriver = function(req, res) {
  Order.find({ driver: req.query.driverName, state: 'Order Placed' }, function(err, orders) {
    if (!err) {
      res.status(200).json(orders);
    } else {
      res.status(404).json(err);
    }
  });
}



/* Admin actions */

/*
	Retrieves all orders that we placed at today's date
 */
module.exports.getCurrentOrderCount = function(req, res) {
	Order.find({}, function(err, orders) {
		if (!err) {
			res.status(200).json(orders);
		} else {
			res.status(500).json(err);
		}
	});
};

/*
	Retrieves all orders that have been delivered today
 */
module.exports.getDeliveredCount = function(req, res) {
	Order.find({ state: 'Dropped Off' }, function(err, orders) {
		if (!err) {
			res.status(200).json(orders);
		} else {
			res.status(500).json(err);
		}
	});
};

/*
	Retrieves all newly placed orders
 */
module.exports.getPlacedOrders = function(req, res) {
	Order.find({ state: 'Order Placed' }, function(err, orders) {
		if (!err) {
			res.status(200).json(orders);
		} else {
			res.status(500).json(err);
		}
	});
};

