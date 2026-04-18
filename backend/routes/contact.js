const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message, userId, role } = req.body;

    const newQuery = new Contact({
      name,
      email,
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

module.exports = router;