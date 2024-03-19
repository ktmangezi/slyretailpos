const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const WebSocket = require('ws'); // Import WebSocket library
const http = require('http'); // Import Node.js HTTP module
const app = express();
const cors = require('cors');
const receipts = require('./routers/receiptRouter');
const inventoryUpdates = require('./routers/inventoryRouter');
const productUpdates = require('./routers/productsRouter');
const employees = require('./routers/employeesRouter');
const stores = require('./routers/storeRouter');
const users = require('./routers/usersRouter');

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/nexusposDb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/api/receiptRouter', receipts);
app.use('/api/inventoryRouter', inventoryUpdates);
app.use('/api/productRouter', productUpdates);
app.use('/api/employeesRouter', employees);
app.use('/api/storeRouter', stores);
app.use('/api/usersRouter', users);

// Create HTTP server
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('WebSocket connection established.');

  // WebSocket message handler
  ws.on('message', (message) => {
    console.log('Received message:', message);
    // Handle received message
    // For example, broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // WebSocket close handler
  ws.on('close', () => {
    console.log('WebSocket connection closed.');
  });
});

// const storesCollection = mongoose.connection.collection('stores');

// // Create a Change Stream for the 'store' collection
// const storeChangeStream = storesCollection.watch();

// // Listen for changes in the 'store' collection
// storeChangeStream.on('change', async (change) => {
//   console.log('Change detected in store collection:', change);

//   try {
//     const Employee = require('./models/empoyees'); // Import your Employee model
//     const Store = require('./models/store'); // Import your store model

//     if (change.operationType !== 'delete') {
//       const updatedStoreId = new mongoose.Types.ObjectId(change.documentKey._id);
//       const updatedStore = await Store.findOne({ _id: updatedStoreId });

//       if (updatedStore) {
//         const associatedEmployees = await Employee.find({
//           $or: [
//             { _id: updatedStore.driverId },
//             { _id: updatedStore.conductorId }
//           ]
//         });

//         await Promise.all(associatedEmployees.map(async (employee) => {
//           if (
//             employee._id.toString() === updatedStore.driverId ||
//             employee._id.toString() === updatedStore.conductorId
//           ) {
//             employee.status = 'Activated';
//             employee.storeName = updatedStore.storeName;
//             employee.storeId = updatedStore._id.toString();
//           } else {
//             employee.status = 'Not Activated';
//             employee.storeName = null;
//             employee.storeId = null;
//           }

//           await employee.save();
//         }));

//         console.log('Employees updated successfully based on store changes.');
//       } else {
//         console.log('Updated store not found.');
//       }
//     } else {
//       const deletedStoreId = new mongoose.Types.ObjectId(change.documentKey._id);
//       const storeIdString = deletedStoreId.toString();
// console.log('====================================');
// console.log(storeIdString);
// console.log('====================================');
//       // Introduce a delay before querying the collection again
//       setTimeout(async () => {
//         try {
//           const associatedEmployees = await Employee.find({
//             storeId: storeIdString // Assuming the field in the employee model is named 'storeId'
//           });

//           await Promise.all(associatedEmployees.map(async (employee) => {
//             employee.status = 'Not Activated';
//             employee.storeName = null;
//             employee.storeId = null; // Reset the storeId field

//             await employee.save();
//             console.log('Employees updated successfully after store deletion.',employee );
//           }));

//         } catch (error) {
//           console.error('Error updating employees after store deletion:', error);
//         }
//       }, 3000); // Adjust the delay time as needed
//     }
//   } catch (error) {
//     console.error('Error updating employees:', error);
//   }
// });
// Start the server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
