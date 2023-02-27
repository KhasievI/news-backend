const News = require("../models/News.model");

module.exports.newsController = {
  postNews: async (req, res) => {
    try {
      const news = await News.create({
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
      });
      return res.json(news);
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteNews: async (req, res) => {
    try {
      const news = await News.findByIdAndDelete(req.params.id);
      return res.json(news);
    } catch (error) {
      console.log(error.message);
    }
  },
  updateNews: async (req, res) => {
    try {
      const news = await News.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        text: req.body.text,
        category: req.body.category,
      });
      return res.json(news);
    } catch (error) {
      console.log(error.message);
    }
  },
  getByIdNews: async (req, res) => {
    try {
      const news = await News.findById(req.params.id)
      return res.json(news);
    } catch (error) {
      console.log(error.message);
    }
  },
  getNews: async (req, res) => {
    try {
      const news = await News.find()
      .populate("category")
      return res.json(news);
    } catch (error) {
      console.log(error.message);
    }
  },
  getNewsByIdCat: async (req, res) => {
    try {
      const news = await News.find({ category: req.params.category })
      .populate("category")
      return res.json(news);
    } catch (error) {
      console.log(error.message);
    }
  },
};
