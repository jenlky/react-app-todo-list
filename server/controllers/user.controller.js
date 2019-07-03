require("../models/user.model");

const mongoose = require("mongoose");
const User = mongoose.model("User");

const findAllLists = async id => {
  console.log("findAllLists", id);
  const user = await User.findOne({ id }).catch(e => console.log(e));
  console.log(user);
  return user;
};

// const insertOne = async pokemon => {};

// const updateOne = async (id, payload) => {};

// const deleteOne = async id => {};

module.exports = {
  findAllLists
  // insertOne,
  // updateOne,
  // deleteOne
};
