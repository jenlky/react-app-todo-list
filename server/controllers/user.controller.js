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

const findListIndex = (user, listId) => {
  let index;
  for (let x = 0; x < user.lists.length; x++) {
    if (user.lists[x].id === listId) {
      index = x;
    }
  }
  return index;
};

const deleteOneList = async (userId, listId) => {
  let user = await User.findOne({ id: userId });
  const index = findListIndex(user, listId);

  user.lists.splice(index, 1);
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

const createOneListItem = async (userId, listId, itemId) => {
  if (itemId === undefined) {
    let user = await User.findOne({ id: userId });
    const index = findListIndex(user, listId);
    // console.log("index", index);

    const newItemId = user.lists[user.lists.length - 1].id + "-1";
    // console.log("newItemId", newItemId);

    user.lists[index].listItems.push({
      id: `${newItemId}`,
      text: "",
      children: []
    });
    await user.save();

    user = await User.findOne({ id: userId });
    return user.lists;
  }
};

const updateOneListItem = async (userId, listId, name) => {};

const deleteOneListItem = async (userId, listId) => {};

module.exports = {
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
  createOneListItem,
  updateOneListItem,
  deleteOneListItem
};
