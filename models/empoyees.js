const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  role: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  pin: {
    type: Number,
  },
  userId: {
    type: String,
  },
  createdBy:{
    type: String,
  },
  storeName: {
    type: String,
    default: null,
  },
  storeId: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: 'Not Activated',
  },
  // Add more fields as needed
});

// employeeSchema.pre('save', async function (next) {
//   const assignedBus = await mongoose.model('Bus').findOne({
//     $or: [{ driverId: this._id }, { conductorId: this._id }],
//   });

//   if (assignedBus) {
//     this.status = 'Activated';
//     this.numberPlate = assignedBus.numberPlate;
//     this.busName = assignedBus.busName;
//   } else {
//     this.status = 'Not Activated';
//     this.numberPlate = null;
//     this.busName = null;
//   }

//   next();
// });

// // Add a post 'save' hook to update employee if assigned bus changes
// employeeSchema.post('save', async function (employee) {
//   const assignedBus = await mongoose.model('Bus').findOne({
//     $or: [{ driverId: employee._id }, { conductorId: employee._id }],
//   });

//   if (assignedBus) {
//     employee.status = 'Activated';
//     employee.numberPlate = assignedBus.numberPlate;
//     employee.busName = assignedBus.busName;
//   } else {
//     employee.status = 'Not Activated';
//     employee.numberPlate = null;
//     employee.busName = null;
//   }

//   await employee.save();
// });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;