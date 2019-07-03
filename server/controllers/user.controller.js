require("../models/user.model");

const mongoose = require("mongoose");
const User = mongoose.model("User");

const findAllLists = async id => {
  const user = await User.findOne({ id });
  return user.lists;
};

const createOneList = async id => {
  let user = await User.findOne({ id });

  const listId = user.lists.length + 1 + "";
  const newList = {
    id: `${listId}`,
    name: "",
    items: [{ id: "1", text: "", children: [] }]
  };
  user.lists.push(newList);
  await user.save();

  user = await User.findOne({ id });
  return user.lists;
};

const updateOneList = async (id, payload) => {};

const deleteOneList = async id => {};

module.exports = {
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList
};
