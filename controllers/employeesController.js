const Employee = require('../models/empoyees');
const Store = require('../models/store')
// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    // const employees = await Employee.find().sort({ storeName: 1 });
    //console.log(employees);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createemployee = async (req, res) => {
  try {
    const {
      companyName,
      userName,
      phoneNumber,
      role,
      pin,
      userId,
      createdBy
    } = req.body;

    // Get the user ID from the decoded token in the request headers

    const employee = new Employee({
      companyName,
      userName,
      phoneNumber,
      role,
      pin,
      userId,
      createdBy, // Assign the createdBy field to the user ID
    });

    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a employee
const deleteemployee = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedemployee = await Employee.findByIdAndDelete(id);

    if (!deletedemployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // // Update corresponding Store data if the employee is a driver or cashier
    // if (deletedemployee.role === 'Driver') {
    //   await Store.findOneAndUpdate({ driverId: deletedemployee.userId }, { driver: null });
    // }

    if (deletedemployee.role === 'Cashier') {
      await Store.findOneAndUpdate({ cashierId: deletedemployee.userId }, { cashier: null });
    }

    res.json(deletedemployee);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get a specific employee by ID
const getemployeeById = async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
  
      if (!employee) {
        return res.status(404).json({ error: 'employee not found' });
      }
  
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        companyName,
        userName,
        phoneNumber,
        role,
        pin,
        userId,
      } = req.body;
  
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
          companyName,
          userName,
          phoneNumber,
          role,
          pin,
          userId,
        },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Update corresponding Store data if the employee is a driver or cashier
      // if (updatedEmployee.role === 'Driver') {
      //   await Store.findOneAndUpdate({ driverId: updatedEmployee.userId }, { driver: updatedEmployee.userName });
      // }
  
      if (updatedEmployee.role === 'Cashier') {
        await Store.findOneAndUpdate({ cashierId: updatedEmployee.userId }, { cashier: updatedEmployee.userName });
      }
  
      res.json(updatedEmployee);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = {
    getAllEmployees,
    createemployee,
    deleteemployee,
    getemployeeById,
    updateEmployee, // Add the new function to the exported object
  };