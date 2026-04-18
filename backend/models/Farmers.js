const mongoose = require('mongoose');

const farmer_loginSchema = new mongoose.Schema({
    f_id: Number,
    mobile:  String,
    password: String,
},{ collection: 'farmer_details' });

module.exports = mongoose.model('farmer_login', farmer_loginSchema);
