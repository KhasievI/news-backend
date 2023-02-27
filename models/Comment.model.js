const mongoose = require("mongoose");

const commentToNewsSchema = mongoose.Schema({
  name: String,
  text: String,
  news: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'News',
  },
});

const Comment = mongoose.model("Comment", commentToNewsSchema);

module.exports = Comment;