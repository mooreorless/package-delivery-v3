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
	orderPlacedAt: {
		type: Date,
		default: Date.now
	},
	pickedUpAt:{
		type: Date,
		default: null
	},
	droppedOffAt:{
		type: Date,
		default: null
	},
	paidAt: {
		type: Date,
		default: null
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


mongoose.model('Order', orders);
