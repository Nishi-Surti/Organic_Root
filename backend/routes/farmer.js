const path = require("path");
const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,"../uploads"));
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// routes/farmer.js

router.get('/approved-farmers', async (req, res) => {
  try {
    const farmers = await Farmer.find({ status: 'approved' });
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register-farmer', upload.single("fimage"), async(req,res) =>{
    try
    {
        console.log("BODY : ",req.body);
        const farmer = new Farmer({
            ...req.body,
            fimage: req.file ? req.file.filename: ""
        });

        const savedFarmer = await farmer.save();

        console.log("SAVED : ",savedFarmer);

        res.status(200).json({
            message: "Farmer registered successfully"
        });
    }
    catch(err)
    {
        console.log("save error: ",err);
        res.status(500).json({error: err.message});
    }
});

router.get("/farmers", async (req, res) => {
  try {
    const farmers = await Farmer.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All Farmers

// Get Pending Farmers
router.get("/farmers/pending", async (req, res) => {
  try {
    const farmers = await Farmer.find({ status: "Pending" });
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Approve Farmer
router.put("/farmers/approve/:id", async (req, res) => {
  try {
    await Farmer.findByIdAndUpdate(req.params.id, {
      status: "Approved"
    });
    res.json({ message: "Farmer Approved" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Reject Farmer
router.put("/farmers/reject/:id", async (req, res) => {
  try {
    await Farmer.findByIdAndUpdate(req.params.id, {
      status: "Rejected"
    });
    res.json({ message: "Farmer Rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;