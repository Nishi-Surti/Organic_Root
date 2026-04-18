const express = require('express');
const router = express.Router();
const Place_Order = require('../models/Place_Order');

router.get("/farmer-earnings/:f_id", async (req, res) => {
  try 
  {

    const farmerId = parseInt(req.params.f_id);

    const orders = await Place_Order.find({
      f_id: farmerId
    });

    let total = 0;
    let pending = 0;
    let available = 0;
    let monthly = 0;
    let week = 0;

    const now = new Date();

    orders.forEach(o => {

  // ✅ Total Earned
  if (o.orderStatus !== "Cancelled") {
    total += o.totalPrice;
  }

  // ✅ Pending (NOT delivered)
  if (o.orderStatus !== "Delivered") {
    pending += o.totalPrice;
  }

  // ✅ Available (ONLY Delivered)
  if (o.orderStatus === "Delivered") {
    available += o.totalPrice;
  }

  // ✅ Monthly
  const d = new Date(o.orderDate);
  if (
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  ) {
    monthly += o.totalPrice;
  }

  // ✅ Weekly
  const diff = (now - d) / (1000*60*60*24);
  if (diff <= 7) {
    week += o.totalPrice;
  }

});

    res.json({ total, pending, available, monthly, week, orders });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;   // 🔥 MOST IMPORTANT