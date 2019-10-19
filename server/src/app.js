require("./utils/db");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(userRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});

module.exports = app;
