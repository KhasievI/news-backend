const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const authRouter = require("./routes/authRouter");

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors())
app.use("/auth", authRouter);
app.use(require('./routes/category.route'))
app.use(require('./routes/comment.route'))
app.use(require('./routes/news.route'))
app.use('/public', express.static(__dirname + '/public'));

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://khasiev:malsy1999@cluster0.yzc6knt.mongodb.net/newsDataBase`
    );
    app.listen(PORT, () => {
      console.log(`Сервер успешно запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

start();
