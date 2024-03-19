const express = require('express');
const storeInfoController = require('../controllers/storeController');

const router = express.Router();

// Define the routes for data CRUD operations
router.get('/stores', storeInfoController.getAllstores);
router.post('/create', storeInfoController.createstore);
router.get('/show/:id', storeInfoController.getstoreById);
router.put('/update/:id', storeInfoController.updatestore); // Add the update route
router.delete('/delete/:id', storeInfoController.deletestore);

module.exports = router;