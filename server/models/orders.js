var mongoose = require( 'mongoose' );
var crypto = require('crypto');


var orders = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  pickUp: {
    type: String,
    required: true
  },
  dropOff: {
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
});

orders.methods.setState = function(action){
  this.state = action;
};


mongoose.model('Order', orders);