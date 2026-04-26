const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Admin = require("../models/Admin");
const Place_Order = require("../models/Place_Order");

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

router.get("/totalFarmers", async (req, res) => {
  try {
    const count = await mongoose.connection
      .collection("farmer_details")
      .countDocuments();

    res.json({
      totalFarmers: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/totalProducts", async (req, res) => {
  try {
    const count = await mongoose.connection
      .collection("product_details")
      .countDocuments();

    res.json({
      totalProducts: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/totalOrders", async (req, res) => {
  try {
    const count = await mongoose.connection
      .collection("order_details")
      .countDocuments();
    res.json({
      totalOrders: count,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Node.js example
router.get("/total-users", async (req, res) => {
  try {
    const farmers = await mongoose.connection
      .collection("farmer_details")
      .countDocuments();

    const consumers = await mongoose.connection
      .collection("consumer_detail")
      .countDocuments();

    res.json({
      totalUser: farmers + consumers,
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

router.get("/adminOrders", async (req, res) => {
  try {
    const orders = await mongoose.connection
      .collection("order_details")
      .find()
      .toArray();

    const totalOrders = orders.length;

    const placedOrders = orders.filter(
      (o) =>
        o.orderStatus === "Pending" ||
        o.orderStatus === "Confirmed" ||
        o.orderStatus === "Cancelled" ||
        o.orderStatus === "Packed",
    ).length;

    const deliveredOrders = orders.filter(
      (o) => o.orderStatus === "Delivered",
    ).length;

    const totalEarnings = orders
      .filter((o) => o.paymentMethod !== "cod" || o.orderStatus === "Delivered")
      .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    res.json({
      totalOrders,
      placedOrders,
      deliveredOrders,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET FARMERS
router.get("/farmers", async (req, res) => {
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
router.get("/consumers", async (req, res) => {
  try {
    const consumers = await mongoose.connection
      .collection("consumer_detail")
      .find()
      .toArray();

    res.json(consumers);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.put("/block-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await mongoose.connection
      .collection("consumer_detail")
      .updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { status } }
      );

    await mongoose.connection
      .collection("farmer_details")
      .updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { status } }
      );

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;

  await mongoose.connection
    .collection("consumer_detail")
    .deleteOne({ _id: new mongoose.Types.ObjectId(id) });

  await mongoose.connection
    .collection("farmer_details")
    .deleteOne({ _id: new mongoose.Types.ObjectId(id) });

  res.json({ message: "User deleted" });
});

router.get("/report-data", async (req, res) => {
  try {
    const farmers = await mongoose.connection
      .collection("farmer_details")
      .find()
      .toArray();

    const consumers = await mongoose.connection
      .collection("consumer_detail")
      .find()
      .toArray();

    const orders = await mongoose.connection
      .collection("order_details")
      .find()
      .toArray();

    // Example aggregation (month wise dummy logic)
    const months = ["Jan","Feb","Mar","Apr"];

    res.json({
      farmerRegistrations: [10, 20, 15, 25], // 🔥 dynamic banaavi sako
      farmerSales: [2000, 3000, 2500, 4000],

      consumerRegistrations: [5, 10, 15, 20],
      consumerOrders: [50, 80, 120, 150],

      platformGrowth: [
        farmers.length,
        consumers.length,
        orders.length,
        farmers.length + consumers.length
      ],

      revenue: [10000, 15000, 12000, 20000],

      labels: months
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
