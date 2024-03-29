const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../midlewaree/authMiddleware");

router.post(
  "/registration",
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", controller.getUsers);

module.exports = router;
