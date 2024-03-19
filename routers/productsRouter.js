
const express = require('express');
const router = express.Router();
const ProductUpdateController = require('../controllers/productsController');

// Route to handle creating or updating Product updates
router.post('/product-updates', ProductUpdateController.createOrUpdateProduct);
router.get('/products', ProductUpdateController.fetchProducts);

module.exports = router;
