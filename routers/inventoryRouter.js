const express = require('express');
const router = express.Router();
const controller = require('../controllers/InventoryHistoryController');

router.post('/inventory-updates', controller.createOrUpdateInventoryUpdates);
router.get('/inventories', controller.fetchInventoryUpdates);

module.exports = router;
