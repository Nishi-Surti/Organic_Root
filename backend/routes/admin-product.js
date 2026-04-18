const express = require('express');
const router = express.Router();
const Prosuct = require('../models/Product_Detail');
const Product_Detail = require('../models/Product_Detail');

router.get('/products', async (req,res) => {
  try {
    const products = await Product_Detail.find().sort({ product_id: -1 });
    res.json(products);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/products/:id',async (req , res) => {
    try
    {
        await Product_Detail.findByIdAndDelete( req.params.id);
        res.json({ message: "Product Deleted Successfully"});
    
    }
    catch(err)
    {
        res.status(500).json({ message: err.message});
    }
});

module.exports = router;