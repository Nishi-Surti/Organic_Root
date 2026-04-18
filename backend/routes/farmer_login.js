const express = require('express');
const router = express.Router();
const Farmer_Regis = require('../models/Farmer_Regis');



router.post('/farmer-login',async(req , res) => {
    try
    {
        const { mobile , password } = req.body;

        const farmer_login = await Farmer_Regis.findOne({ mobile: mobile, password: password})

        // const allFarmers = await Farmer_Regis.find();
        // console.log("All Farmers:", allFarmers);
        
        const allFarmers = await Farmer_Regis.find();
        console.log("All Farmers:", allFarmers);
        
        console.log("Request Body:", req.body);
        console.log("Database Result:", farmer_login);

        if(!farmer_login)
        {
            return res.status(401).json({ message: "Invalid mobile or password"})
        }
        res.status(200).json({
            message: "Farmer login successfully",
            farmer_login: farmer_login
        });
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error"})
    }
});


module.exports = router;