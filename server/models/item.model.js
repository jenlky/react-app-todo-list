const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: { type: String, require: true, unique: true },
  text: { type: String }
});

mongoose.model("Item", itemSchema);
