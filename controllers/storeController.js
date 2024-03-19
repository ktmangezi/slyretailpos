const Store = require('../models/store');
const Employee = require('../models/empoyees')
// Get all stores
const getAllstores = async (req, res) => {
  try {
    const stores = await Store.find().sort({ storeName: 1 }); // Sort by storeName in ascending order
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
const createstore = async (req, res) => {
  try {
    const {
        companyName, // Use the companyName state value
        cashier,
        cashierId,
        storeName,
        address,
        storeId,
        phone,
        createdBy,
    } = req.body;

    const store = new Store({
        companyName, // Use the companyName state value
        cashier,
        cashierId,
        storeName,
        address,
        phone,
        storeId,
        createdBy,
    });

    await store.save();
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a store
const deletestore = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedstore = await Store.findByIdAndDelete(id);

    if (!deletedstore) {
      return res.status(404).json({ error: 'store not found' });
    }

    res.json(deletedstore);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get a specific store by ID
const getstoreById = async (req, res) => {
    try {
      const { id } = req.params;
      const store = await Store.findById(id);
  
      if (!store) {
        return res.status(404).json({ error: 'store not found' });
      }
  
      res.json(store);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
// Update a store
const updatestore = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      cashier,
      cashierId,
      storeName,
      address,
      storeId,
      phone
    } = req.body;

    const updatedstore = await Store.findByIdAndUpdate(
      id,
      {
        companyName,
        cashier,
        cashierId,
        storeName,
        address,
        phone,
        storeId,
      },
      { new: true }
    );

    if (!updatedstore) {
      return res.status(404).json({ error: 'store not found' });
    }

    res.json(updatedstore);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllstores,
  createstore,
  deletestore,
  getstoreById,
  updatestore, // Add the new function to the exported object
};