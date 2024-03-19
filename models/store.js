const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  cashier: {
    type: String,
  },

  createdBy: {
    type: String,
  },
  cashierId: {
    type: String,
  },
  storeName: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address:{
    type:String,
  },

  sales:{
    type:String,
  },

    storeId: {
    type: String,
  },

  // Add more fields as needed
});

const Store = mongoose.model('Store', StoreSchema);

module.exports = Store;