const express = require('express');
const router = express.Router();
const Consumer_Regis = require('../models/Consumer_Regis');



router.post('/consumer-login',async(req , res) => {
    try
    {
        const { mobile , password } = req.body;

        const consumer_login = await Consumer_Regis.findOne({ mobile: mobile, password: password})

        // const allFarmers = await Farmer_Regis.find();
        // console.log("All Farmers:", allFarmers);
        
        const allConsumers = await Consumer_Regis.find();
        console.log("All Farmers:", allConsumers);
        
        console.log("Request Body:", req.body);
        console.log("Database Result:", consumer_login);

        if(!consumer_login)
        {
            return res.status(401).json({ message: "Invalid mobile or password"})
        }
        res.status(200).json({
            message: "Consumer login successfully",
            consumer_login: consumer_login
        });
    }
    catch(err)
    {
        res.status(500).json({ message: "Server error"})
    }
});


module.exports = router;