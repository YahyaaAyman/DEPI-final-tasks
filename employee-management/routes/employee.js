const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Get all employees (homepage)
router.get('/', employeeController.getAllEmployees);

// Create employee
router.get('/employees/new', employeeController.showCreateForm);
router.post('/employees', employeeController.createEmployee);

// Edit employee
router.get('/employees/:id/edit', employeeController.showEditForm);
router.put('/employees/:id', employeeController.updateEmployee);

// Delete employee
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
