const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true,'First name is requried']
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true,   
    unique: true
  },
  password: { 
    type: String,
    required: [true,'password is required']
  },
  userType: {
    type: String,
    required: true,
    enum: ['guest', 'host'],
    default: "guest",
  }  

});

module.exports = mongoose.model("User", userSchema);