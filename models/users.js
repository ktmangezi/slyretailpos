const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    default: 'Active'
  },
  paymentDate: {
    type: Date,
  },
  pin: {
    type: Number, // Assuming the pin is a numeric value
  },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;