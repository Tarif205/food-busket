//User.js
const mongoose = require('mongoose');

// Create a user schema (a structure for the user data)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // user must have a name
  },
  email: {
    type: String,
    required: true, // user must have an email
    unique: true    // no duplicate emails allowed
  },
  password: {
    type: String,
    required: true // user must have a password
  },
  address: {
    type: String,
    required: true // address is optional
  },
  number: {
    type: String,
    required: true // phone number is optional
  }
});

// Add a simple method to check password (not hashed)
userSchema.methods.matchPassword = function (enteredPassword) {
  // Simply compare the entered password with saved password
  return enteredPassword === this.password;
};

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Export the model so we can use it in other files
module.exports = User;
