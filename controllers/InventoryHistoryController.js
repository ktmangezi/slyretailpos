const InventoryUpdate = require('../models/inventory');
// Controller function to fetch inventory updates
const fetchInventoryUpdates = async (req, res) => {
    try {
      // Fetch all inventory updates from the database
      const inventoryUpdates = await InventoryUpdate.find();
      res.status(200).json({ success: true, data: inventoryUpdates });
    } catch (error) {
      console.error('Error fetching Inventory Updates:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };
// Controller function to create or update inventory updates
const createOrUpdateInventoryUpdates = async (req, res) => {
  try {
    let updateData = req.body; // Assuming req.body contains inventory update data
    console.log('====================================');
    console.log(updateData);
    console.log('====================================');
    if (!Array.isArray(updateData)) {
        updateData = [updateData];
      }
  

    // Loop through each item in the array
    const updatedInventoryUpdates = [];
    for (const data of updateData) {
      const { inventoryId, synchronized } = data;
      // Search for the inventory update in the database based on inventoryId
      let existingUpdate = await InventoryUpdate.findOne({ inventoryId });

      if (existingUpdate) {
        // If the inventory update exists, update it
        existingUpdate.synchronized = true;
        await existingUpdate.save(); // Save the changes to the database
        return; // Optionally, you can return a response here
      } else {
        // If the inventory update doesn't exist, create a new one
        const newUpdate = new InventoryUpdate(data);
        await newUpdate.save();
        updatedInventoryUpdates.push(newUpdate);
      }
    }
    
    console.log('Inventory updates processed successfully');
    res.status(200).json({ success: true, message: 'Inventory updates updated/created successfully', data: updatedInventoryUpdates });
  } catch (error) {
    console.error('Error creating/updating Inventory Updates:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = { createOrUpdateInventoryUpdates , fetchInventoryUpdates};
