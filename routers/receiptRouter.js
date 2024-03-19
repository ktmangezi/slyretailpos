const express = require('express');
const receiptController = require('../controllers/ReceiptsController');

const router = express.Router();

// Define the routes for data CRUD operations
router.get('/receipts', receiptController.fetchReceipts); // Add this line to define the route for fetching receipts
router.post('/sync', receiptController.syncReceipt);

module.exports = router;
