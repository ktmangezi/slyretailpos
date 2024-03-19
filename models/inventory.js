const mongoose = require('mongoose');

const inventoryUpdateSchema = new mongoose.Schema({
  productName: String,
  inventoryId: String,
  productId: String,
  currentDate: Date,
  stockBefore: Number,
  stockAfter: Number,
  typeOfEdit: String,
  synchronized: { type: Boolean, default: true } // Indicates if the receipt has been synchronized
});

const InventoryUpdate = mongoose.model('InventoryUpdate', inventoryUpdateSchema);
module.exports = InventoryUpdate
