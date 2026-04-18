const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer_Regis');


// ✅ GET Pending Farmers
router.get('/pending-farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find({ status: "Pending" });
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Approve Farmer
router.put('/approve-farmer/:f_id', async (req, res) => {
  try {
    await Farmer.findOneAndUpdate(
    {f_id: req.params.f_id},
    {status: "Approved"}
  );
  res.json({ message: "Farmer Approved" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Reject Farmer
router.put('/reject-farmer/:f_id', async (req, res) => {
  try {
    await Farmer.findOneAndUpdate(
      {f_id: req.params.f_id},
      {status: "Rejected"}
    );
    res.json({ message: "Farmer Rejected" });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
