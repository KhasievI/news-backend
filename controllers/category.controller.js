const Category = require("../models/Category.model");

module.exports.categoriesController = {
  postCategory: async (req, res) => {
    try {
      const cat = await Category.create({
        nameCategory: req.body.nameCategory,
      });
      return res.json(cat);
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const deleteCat = await Category.findByIdAndDelete(req.params.id);
      return res.json(deleteCat);
    } catch (error) {
      console.log(error.message);
    }
  },
  getCategories: async (req, res) => {
    try {
      const cats = await Category.find()
      return res.json(cats)
    } catch (error) {
      console.log(error.message);
    }
  },
};
