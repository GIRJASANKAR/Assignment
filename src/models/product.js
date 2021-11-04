const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
  },
  productName: {
    type: String,
  },
  qtyPerUnit: {
    type: Number,
  },
  unitPrice: {
    type: Number,
  },
  unitInStock: {
    type: Number,
  },
  discontinued: {
    type: Boolean,
  },
  categoryId: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
