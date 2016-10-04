var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var SECRET = require('../config/jwt');

var packageUsers = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  streetNumber: {
    type: String,
    required: true
  },
  streetName: {
    type: String,
    required: true
  },
  suburb: {
    type: String,
    required: true
  },
  postCode: {
    type: String,
    required: true
  },
  isDriver: {
    type: Boolean,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  hash: String,
  salt: String
});

packageUsers.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

packageUsers.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

packageUsers.methods.generateJwt = function() {
  console.log('generating token');
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    exp: parseInt(expiry.getTime() / 1000),
  }, SECRET.TOKEN_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('User', packageUsers);
