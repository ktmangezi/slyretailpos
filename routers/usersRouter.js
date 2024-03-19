const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Define the routes for data CRUD operations
router.post('/signup', usersController.signup);
router.post('/signin', usersController.signin);
router.post('/submitEmail', usersController.submitEmail);
router.post('/resetPassword', usersController.resetPin);
router.get('/checkUserStatus/:userId', usersController.checkUserStatus);

module.exports = router;