const mongoose = require('mongoose');

const manageCategorySchema = new mongoose.Schema({
    cat_id :{
        type: Number,
        unique: true
    },
    category: String
});

module.exports = mongoose.model('category_detail',manageCategorySchema);