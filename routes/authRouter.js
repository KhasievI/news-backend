const Router = require('express');
const router = new Router();
const controller = require("../controllers/authController");
const {check} = require('express-validator')
const authMiddleware = require('../midlewaree/authMiddleware')


router.post("/registration", [
    check('username', "имя пользователя не может быть пустым").notEmpty(),
    check('password', "пароль не может быть короче 4 или длиннее 10 символов").isLength({min:4, max: 10})
], controller.registration);
router.post("/login", controller.login);
router.get("/users", authMiddleware, controller.getUsers);

module.exports = router;
