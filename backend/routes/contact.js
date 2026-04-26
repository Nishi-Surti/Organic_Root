const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');

router.post("/contact", async (req, res) => {
  try {
    const { name, email, mobile, message, userId, role } = req.body;

    const newQuery = new Contact({
      name,
      email,
      mobile,
      message,
      userId,
      role
    });

    await newQuery.save();
    res.status(200).json({ message: "Query submitted" });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Admin fetching queries
router.get("/queries", async (req, res) => {
  try {
    const queries = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(queries);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Admin replying to a query
router.put("/queries/reply/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const updatedQuery = await Contact.findByIdAndUpdate(id, { reply }, { new: true });
    if (!updatedQuery) {
      return res.status(404).json({ message: "Query not found" });
    }
    res.status(200).json({ message: "Reply submitted successfully", query: updatedQuery });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;