const mongoose = require('mongoose');

const consumerSchema = new mongoose.Schema({
    c_id: {
        type: Number,
        unique: true
    },
    name: String,
    mobile: Number,
    address: String,
    city : String,
    pincode : Number,
    password: String,
    role:{
    
        type: String,
        default: 'consumer'
    }
});

module.exports = mongoose.model('consumer_detail',consumerSchema);