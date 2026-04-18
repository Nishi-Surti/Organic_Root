const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Place_Order = require('../models/Place_Order');

router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email, password: password });

    if (!admin) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Login Success", admin });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/totalFarmers', async (req, res) => {
  try {

    const count = await mongoose.connection
      .collection("farmer_details")
      .countDocuments();

    res.json({
      totalFarmers: count
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/totalProducts', async( req, res)=>{
  try
  {
     const count = await mongoose.connection
      .collection("product_details")
      .countDocuments();

    res.json({
      totalProducts: count
    });
  }
  catch (error) 
  {
    res.status(500).json({ error: error.message });
  }
});

router.get('/totalOrders', async(req, res)=> {
  try
  {
    const count = await mongoose.connection
    .collection("order_details")
    .countDocuments();
    res.json({
      totalOrders: count
    });
  }
  catch (error)   
  {
    res.status(500).json({ error: error.message });
  }
});

// Node.js example
router.get('/total-users', async (req, res) => {
  try {
    const farmers = await mongoose.connection
      .collection("farmer_details")
      .countDocuments();

    const consumers = await mongoose.connection
      .collection("consumer_details")
      .countDocuments();

    res.json({
      totalUser: farmers + consumers
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/allOrders", async (req, res) => {
  try {
    const orders = await mongoose.connection
      .collection("order_details")
      .find()
      .sort({ orderDate: -1 })
      .toArray();

    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/adminOrders', async (req, res) => {
  try {
    const orders = await mongoose.connection
      .collection("order_details")
      .find()
      .toArray();

    const totalOrders = orders.length;

    const placedOrders = orders.filter(o => o.orderStatus === "Pending" || o.orderStatus === "Confirmed" || o.orderStatus === "Cancelled" || o.orderStatus === "Packed").length;

    const deliveredOrders = orders.filter(o => o.orderStatus === "Delivered").length;

    const totalEarnings = orders
  .filter(o => 
    o.paymentMethod !== 'cod' || o.orderStatus === "Delivered"
  )
  .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    res.json({
      totalOrders,
      placedOrders,
      deliveredOrders,
      totalEarnings
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET FARMERS
router.get('/farmers', async (req, res) => {
  try {
    const farmers = await mongoose.connection
      .collection("farmer_details")
      .find()
      .toArray();

    res.json(farmers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CONSUMERS
router.get('/consumers', async (req, res) => {
  try {
    const consumers = await mongoose.connection
      .collection("consumer_details")
      .find()
      .toArray();

    res.json(consumers);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
