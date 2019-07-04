require("./utils/db");

const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/users", userRouter);

app.use((err, res, req, next) => {
  console.log("error", err);
  res.sendStatus(500);
});

module.exports = app;