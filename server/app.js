const express = require("express");
const app = express();
const itemRouter = require("./routes/item.route");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use("/item", itemRouter);

app.use((err, res, req, next) => {
  console.log("error", err);
  res.sendStatus(500);
});

module.exports = app;
