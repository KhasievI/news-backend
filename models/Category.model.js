const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  nameCategory: String,
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;