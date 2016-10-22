var mongoose = require( 'mongoose' );
var crypto = require('crypto');


var orders = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  pickUpNumber: {
    type: Number,
    required: true
  },
	pickUpName: {
		type: String,
		required: true
	},
	pickUpSuburb: {
		type: String,
		required: true
	},
	pickUpPostcode: {
		type: Number,
		required: true
	},
	dropOffNumber: {
		type: Number,
		required: true
	},
	dropOffName: {
		type: String,
		required: true
	},
	dropOffSuburb: {
		type: String,
		required: true
	},
	dropOffPostcode: {
		type: Number,
		required: true
	},
	pickUpDate: {
		type: String,
		required: true
	},
  notes: {
    type: String,
    required: false
  },
  isFragile: {
    type: Boolean,
    required: false
  },
  isExpress: {
    type: Boolean,
    required: false
  },
	pickUpDate: {
  	type: String
	},
	timestamp: {
		type: Object,
		default: {
			orderPlaced: Date.now(),
			pickedUp: null,
			delivered: null
		},
	},
  state: {
    type: String,
    required: true,
		default: 'Order Placed'
  },
	driver: {
  	type: String
	}
});

orders.methods.setState = function(action){
  this.state = action;
	inputIntoTimestampArray(action);
};

/*
 When an order is made it inputs the current time into the Database into the corresponding position in the array
 // TODO rename these
 */
function inputIntoTimestampArray(action) {
	switch (action.toLowerCase().replace(" ","")) {
		case "orderplaced":
			return this.timestamp.orderPlaced = Date.now();
			break;
		case "pickedup":
			return this.timestamp.pickedup = Date.now();
			break;
		case "delivered":
			return this.delivered = Date.now();
			break;
	}
}


mongoose.model('Order', orders);