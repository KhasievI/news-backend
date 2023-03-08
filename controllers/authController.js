const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../config");

const generateAccesToken = (id, roles, name, lastname) => {
  const payload = {
    id,
    roles,
    name,
    lastname,
  };
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      const { name, lastname, username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "пользователь с таким именем уже существует" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        name,
        lastname,
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      if (!username) {
        return res
          .status(400)
          .json({ message: "Имя пользователя не может быть пустым" });
      }
      if (password.length >= 12 || password.length < 4) {
        return res
          .status(400)
          .json({
            message: "Пароль не может быть меньше 4 или больше 12 символов",
          });
      }
      await user.save();
      return res.json({ message: "пользователь успешно зарегистрирован" });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Введен неверный пароль" });
      }
      const token = generateAccesToken(
        user._id,
        user.roles,
        user.name,
        user.lastname
      );
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json({ users });
    } catch (error) {}
  }
}

module.exports = new authController();
