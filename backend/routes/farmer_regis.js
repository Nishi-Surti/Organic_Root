const path = require('path');
const express = require('express');
const router = express.Router();
const Farmer_Regis = require('../models/Farmer_Regis');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname,"../uploads"));
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/register-farmer', upload.single("fimage"), async(req,res) =>{
    try
    {
        const lastFarmer = await Farmer_Regis
        .findOne()
        .sort({ f_id: -1 });

        let newf_id = 1;

        if(lastFarmer)
        {
            newf_id = lastFarmer.f_id + 1;
        }
        
        // console.log("BODY : ",req.body);
        // const farmer_regis = new Farmer_Regis({
        //     ...req.body,
        //     fimage: req.file ? req.file.filename: ""
        // });

        // const savedFarmer_Regis = await farmer_regis.save();

        // console.log("SAVED : ",savedFarmer_Regis);

        const newFarmer = new Farmer_Regis({
            f_id: newf_id,
            name: req.body.name,
            mobile: Number(req.body.mobile),
            village: req.body.village,
            password: req.body.password ,
            fimage: req.file ? req.file.filename: "", 
            role: req.body.role , 
            status: req.body.status 
        });
        
        await newFarmer.save();

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
    const farmers = await Farmer_Regis.find({ status: "Approved" });
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;