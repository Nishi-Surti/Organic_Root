const express = require('express');
const router = express.Router();
const Product = require('../models/Product_Detail');

router.get("/category/:category", async (req,res)=>{

 try{

   const products = await Product.find({
     category: { $regex: req.params.category, $options: "i" }
   }).lean();

   res.json(products);

 }catch(err){
   res.status(500).json({message:"Server Error"})
 }

});

router.get("/test",(req,res)=>{
res.send("Product route working");
});

module.exports = router;