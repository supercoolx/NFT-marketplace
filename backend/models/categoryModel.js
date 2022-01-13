const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
    },
},
{
  timestamps: true
});

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category;
