const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const User = require("../models/User");
module.exports = function (req, res, next) {
  const { authorization } = req.headers;
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: "вы не авторизованы" });
    }
    req.user = jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(403).json({ message: "ошибка при авторизации" });
  }
};
