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

// update one list's name
const updateOneList = async (userId, listId, name) => {
  let user = await User.findOne({ id: userId });

  const list = user.lists.find(list => list.id === listId);
  list.name = name;
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

const deleteOneList = async (userId, listId) => {
  let user = await User.findOne({ id: userId });

  const index = user.lists.find((list, index) => {
    if (list.id === listId) {
      return index;
    }
  });
  user.lists.splice(index, 1);
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

module.exports = {
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList
};
