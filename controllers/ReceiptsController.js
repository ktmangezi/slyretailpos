const Receipt = require('../models/receipts');

const fetchReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.json({ success: true, data: receipts });
  } catch (error) {
    console.error('Error fetching receipts:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching receipts' });
  }
};

// Handle receipt synchronization
const syncReceipt = async (req, res) => {
  try {
    let receipts = req.body; // Assuming req.body is an array of receipts
    console.log('====================================');
    console.log(receipts);
    console.log('====================================');
    if (!Array.isArray(receipts)) {
      receipts = [receipts];
    }

    const syncResults = []; // Array to store synchronization results

    for (const receipt of receipts) {
      // Ensure each receipt has synchronized and labelSynchronized properties
      receipt.synchronized = true;
      receipt.labelSynchronized = 'Synced';

      // Check if receipt exists
      const existingReceipt = await Receipt.findOne({ ticketId: receipt.ticketId });

      if (existingReceipt) {
        console.log('Updating existing receipt:', existingReceipt);
        // Update existing receipt
        await Receipt.findOneAndUpdate({ ticketId: receipt.ticketId }, receipt);
        syncResults.push({ success: true, message: `Receipt ${receipt.ticketId} updated and synchronized successfully` });
      } else {
        console.log('Creating new receipt:', receipt);
        // Create new receipt
        await Receipt.create(receipt);
        syncResults.push({ success: true, message: `Receipt ${receipt.ticketId} synchronized successfully` });
      }
    }

    return res.json({ success: true, syncResults });
  } catch (error) {
    console.error('Error synchronizing receipts:', error);
    res.status(500).json({ success: false, message: 'An error occurred while synchronizing receipts' });
  }
};

module.exports = { syncReceipt, fetchReceipts };
