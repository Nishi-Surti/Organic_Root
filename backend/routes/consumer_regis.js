const path = require('path');
const express = require('express');
const router = express.Router();
const Consumer_Regis = require('../models/Consumer_Regis');

router.post('/register-consumer',async( req , res) =>{
    try
    {
        const lastConsumer = await Consumer_Regis
                .findOne()
                .sort({ c_id: -1 });
        
                let newc_id = 1;
        
                if(lastConsumer)
                {
                    newc_id = lastConsumer.c_id + 1;
                }

        const newConsumer = new Consumer_Regis({
            c_id: newc_id,
            name: req.body.name,
            mobile: Number(req.body.mobile),
            address: req.body.address,
            city: req.body.city,
            pincode : Number(req.body.pincode),
            password: req.body.password,
            role: req.body.role
        });
        await newConsumer.save();

        res.status(200).json({
            message: 'Consumer Register Successfully'
        })
    }
    catch (err)
    {
        console.log("save error: ",err);
        res.status(500).json({error: err});
    }
});

router.put('/update-consumer-password', async (req, res) => {
    try {
        const { id, currentPassword, newPassword } = req.body;
        
        const consumer = await Consumer_Regis.findOne({ c_id: Number(id) });
        
        if (!consumer) {
            return res.status(404).json({ message: "Consumer not found" });
        }
        
        if (consumer.password !== currentPassword) {
            return res.status(401).json({ message: "Incorrect current password" });
        }
        
        consumer.password = newPassword;
        await consumer.save();
        
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.log("password update error: ", err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;