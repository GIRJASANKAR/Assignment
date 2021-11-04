const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: Number,
    required: true,
    trim: true,
  },
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
