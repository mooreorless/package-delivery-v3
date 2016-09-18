var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

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
  isFragile: {
    type: Boolean,
    required: true
  },
  isExpress: {
    type: Boolean,
    required: true
  },
  state: {
    type: String,
    required: true
  },
});

orders.methods.setState = function(action){
  this.state = action;
};


mongoose.model('Order', orders);