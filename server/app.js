const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const itemRouter = require("./routes/item.route");

app.use("/item", itemRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
