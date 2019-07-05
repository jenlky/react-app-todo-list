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
    listItems: []
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

const findListIndex = (user, id) => {
  for (let x = 0; x < user.lists.length; x++) {
    if (user.lists[x].id === id) {
      return x;
    }
  }

  return -1;
};

const deleteOneList = async (userId, listId) => {
  let user = await User.findOne({ id: userId });
  const listIndex = findListIndex(user, listId);

  // if (listIndex === -1) {
  //   throw new Error("Cannot find List Id");
  // }

  user.lists.splice(listIndex, 1);
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

const overwriteListItems = async (userId, listId, newList) => {
  let user = await User.findOne({ id: userId });
  const listIndex = findListIndex(user, listId);

  // if (listIndex === -1) {
  //   throw new Error("Cannot find List Id");
  // }

  user.lists[listIndex].listItems = newList.listItems;
  await user.save();
  return user.lists[listIndex];
};

module.exports = {
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
  overwriteListItems
};
