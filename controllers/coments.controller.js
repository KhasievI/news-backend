const { findById } = require("../models/Comment.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User");

module.exports.comment = {
  postCommentNews: async (req, res) => {
    try {
      const user = await User.findOne({id: req.user._id})
      const comm = await Comment.create({
        userID: req.user.id,
        name: req.user.name,
        lastname: req.user.lastname,
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
      const comms = await Comment.find();
      return res.json(comms);
    } catch (error) {
      console.log(error.message);
    }
  },
};
