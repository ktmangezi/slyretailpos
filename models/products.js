// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId: { type: String,},
    productName: { type: String },
    category: { type: String },
    productType: { type: String },
    sku: { type: String },
    barcode: { type: String },
    trackStock: { type: Boolean },
    stock: { type: Number, default: 0 },
    price: { type: Number },
    cost: { type: Number },
    currentDate: { type: Date, default: Date.now },
  });
  
const Product = mongoose.model('Product', productSchema);
module.exports = Product
