const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    f_id: Number,
    farmerName: String,
    farmerVillage: String,
    
    product_id: {
        type: Number,
        unique:true
    },
    category: String,
    pname: String,
    price: Number,
    priceUnit: String,
    quantity: Number,
    quantityUnit: String,
    pimg: String,
});

module.exports = mongoose.model("product_detail",ProductSchema);