const { Router } = require("express");
const { comment } = require("../controllers/coments.controller");
const authMiddleware = require("../midlewaree/authMiddleware");

const router = Router();

router.post("/comment", authMiddleware,  comment.postCommentNews);
router.delete("/comment/:id", comment.deleteComment);
router.get("/comments", comment.getCommById);

module.exports = router;
