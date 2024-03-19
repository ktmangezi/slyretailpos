const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
  ticketId: { type: String, unique: true }, // Define ticketId as unique
  ticketNumber: String,
  dateTime: Date,
  totalAmount: Number,
  totalCost: Number,
  received: Number,
  change: Number,
  discountApplied: Number,
  selectedCurrency: String,
  label:String,
  labelSynchronized:String,
  items: [{
    productId: String,
    productName: String,
    price: Number,
    cost: Number,
    quantity: Number,
    discount: Number,
    discountdiff: Number,
    actualTotal: Number,
    unitPrice: Number,
    unitCost: Number
  }],
  synchronized: { type: Boolean, default: false } // Indicates if the receipt has been synchronized
});

 const Receipt = mongoose.model('Receipt', receiptSchema);
module.exports = Receipt