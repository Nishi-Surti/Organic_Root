const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); 

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

router.get('/admin/total-users', async (req, res) => {
  try {
    const farmers = await db.query('SELECT COUNT(*) AS total FROM farmer_detail');
    const consumers = await db.query('SELECT COUNT(*) AS total FROM consumer_detail');

    const totalUsers = farmers[0].total + consumers[0].total;

    res.json({
      farmers: farmers[0].total,
      consumers: consumers[0].total,
      totalUsers: totalUsers
    });

  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;