const Employee = require('../models/employeeModel.js');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render('employees/index', { 
      employees,
      title: 'Employee Management'
    });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error retrieving employees' });
  }
};

// Show form for creating new employee
exports.showCreateForm = (req, res) => {
  res.render('employees/create', { title: 'Add New Employee' });
};

// Create new employee
exports.createEmployee = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.address || !req.body.salary || !req.body.gender) {
      return res.status(400).render('employees/create', {
        title: 'Add New Employee',
        error: 'All fields are required!'
      });
    }

    // Create new employee
    const newEmployee = new Employee({
      name: req.body.name,
      address: req.body.address,
      salary: req.body.salary,
      gender: req.body.gender
    });

    // Save employee to database
    await newEmployee.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).render('employees/create', {
      title: 'Add New Employee',
      error: error.message || 'Error creating employee'
    });
  }
};

// Show form for editing employee
exports.showEditForm = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.render('employees/edit', { 
      employee,
      title: 'Edit Employee'
    });
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error retrieving employee' });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    // Validate request
    if (!req.body.name || !req.body.address || !req.body.salary || !req.body.gender) {
      const employee = await Employee.findById(req.params.id);
      return res.status(400).render('employees/edit', {
        employee,
        title: 'Edit Employee',
        error: 'All fields are required!'
      });
    }

    // Update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        address: req.body.address,
        salary: req.body.salary,
        gender: req.body.gender
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).send('Employee not found');
    }

    res.redirect('/');
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error updating employee' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).send('Employee not found');
    }
    res.redirect('/');
  } catch (error) {
    res.status(500).send({ message: error.message || 'Error deleting employee' });
  }
};