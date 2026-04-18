const mongoose = require('mongoose');

const PlaceOrderSchema = new mongoose.Schema({

    order_id:{
        type: Number,
        unique: true
    },

    c_id: Number,
    cname: String,
    mobile: Number,
    address: String,
    city: String,
    pincode: Number,

    product_id: Number,
    pimg: String,
    pname: String,
    category: String,
    price: Number,
    priceUnit: String,
    quantity: Number,
    quantityUnit: String,
    totalPrice: Number,

    f_id: Number,
    farmerName: String,
    farmerVillage: String,

    paymentMethod: String,

    orderDate: {
        type: Date,
        default: Date.now
    },

    orderStatus: {
        type: String,
        enum: ['Confirmed','Packed', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Confirmed'
    }

});

module.exports = mongoose.model("order_detail",PlaceOrderSchema);