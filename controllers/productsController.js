const Product = require('../models/products');
// Controller function to fetch products
const fetchProducts = async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.find();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error('Error fetching Products:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  };
// Controller function to create or update products
const createOrUpdateProduct = async (req, res) => {
  try {
    let updateData = req.body; // Assuming req.body contains product updates

    // If updateData is not an array, convert it to an array containing a single object
    if (!Array.isArray(updateData)) {
      updateData = [updateData];
    }

    // Loop through each item in the array
    const updatedProducts = [];
    for (const data of updateData) {
      const { productId } = data;
      // Search for the product in the database based on productId
      let existingProduct = await Product.findOne({ productId });

      if (existingProduct) {
        
        // If the product exists, update it
        existingProduct = await Product.findOneAndUpdate(
          { productId },
          { $set: data },
          { new: true }
        );
        updatedProducts.push(existingProduct);
      } else {
        // If the product doesn't exist, create a new one
        const newProduct = new Product(data);
        await newProduct.save();
        updatedProducts.push(newProduct);
      }
    }
    
    res.status(200).json({ success: true, message: 'Products updated/created successfully', data: updatedProducts });
  } catch (error) {
    console.error('Error creating/updating Products:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

module.exports = { createOrUpdateProduct, fetchProducts };
