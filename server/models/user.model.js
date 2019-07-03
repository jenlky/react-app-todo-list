const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, require: true },
  name: { type: String, require: true },
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  lists: [
    {
      id: String,
      items: [
        {
          id: { type: String, require: true, unique: true },
          text: { type: String },
          children: { type: [Array] }
        }
      ]
    }
  ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
