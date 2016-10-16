var mongoose = require( 'mongoose' );
var crypto = require('crypto');


var orders = new mongoose.Schema({
  userID: {
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
};


mongoose.model('Order', orders);