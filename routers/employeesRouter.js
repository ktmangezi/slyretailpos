const express = require('express');
const EmployeeInfoController = require('../controllers/employeesController');

const router = express.Router();

// Define the routes for data CRUD operations
router.get('/employees', EmployeeInfoController.getAllEmployees);
router.post('/create', EmployeeInfoController.createemployee);
router.get('/show/:id', EmployeeInfoController.getemployeeById);
router.put('/update/:id', EmployeeInfoController.updateEmployee); // Add the update route
router.delete('/delete/:id', EmployeeInfoController.deleteemployee);

module.exports = router;