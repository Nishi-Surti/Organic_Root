const mongoose = require('mongoose');

const AdminTable = new mongoose.Schema({
    email: String,
    password: String

});

module.exports = mongoose.model("admin_detail",AdminTable,"admins");