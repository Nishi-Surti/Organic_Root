const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    f_id: {
        type: Number,
        unique: true
    },
    name: String,
    mobile: Number,
    village: String,
    password: String,
    fimage: String,
    role: {
        type: String,
        default: 'farmer'
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
})

module.exports = mongoose.model('farmer_detail',farmerSchema,"farmer_details");