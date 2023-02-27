const Comment = require("../models/Comment.model");

module.exports.comment = {
  postCommentNews: async (req, res) => {
    try {
      const comm = await Comment.create({
        name: req.body.name,
        text: req.body.text,
        news: req.body.news,
      });
      return res.json(comm);
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comm = await Comment.findByIdAndDelete(req.params.id);
      return res.json(comm);
    } catch (error) {
      console.log(error.message);
    }
  },
  getCommById: async (req, res) => {
    try {
      const comms = await Comment.find({ news: req.params.news }).populate(
        "news"
      );
      return res.json(comms);
    } catch (error) {
      console.log(error.message);
    }
  },
};
