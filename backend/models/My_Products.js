const mongoose = require('mongoose');

const myProductSchema = new mongoose.Schema({
    product_id: Number,
    category: String,
    pname: String,
    price: Number,
    priceUnit: String,
    quantity: Number,
    quantityUnit: String,
    pimg: String,

    farmerId: Number,
    farmerName: String,
});

module.exports = mongoose.model("Products",myProductSchema);