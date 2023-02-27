const { Router } = require("express");
const { comment } = require("../controllers/coments.controller");

const router = Router();

router.post("/comment", comment.postCommentNews);
router.delete("/comment/:id", comment.deleteComment);
router.get("/comment/:news", comment.getCommById);

module.exports = router;
