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

// either find list or listItem index
const findIndex = (start, id, isList) => {
  let index;

  if (isList) {
    for (let x = 0; x < start.lists.length; x++) {
      if (start.lists[x].id === id) {
        index = x;
      }
    }
  } else {
    for (let x = 0; x < start.listItems.length; x++) {
      if (start.listItems[x].id === id) {
        index = x;
      }
    }
  }

  return index;
};

const deleteOneList = async (userId, listId) => {
  let user = await User.findOne({ id: userId });
  const index = findIndex(user, listId, true);

  user.lists.splice(index, 1);
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

const createOneListItem = async (userId, listId) => {
  let user = await User.findOne({ id: userId });
  const index = findIndex(user, listId, true);

  const newItemId = Number(user.lists[user.lists.length - 1].id) + 1 + "";
  user.lists[index].listItems.push({
    id: `${newItemId}`,
    text: "",
    children: []
  });
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

const updateOneListItem = async (userId, listId, itemId, text) => {
  let user = await User.findOne({ id: userId });
  const listIndex = findIndex(user, listId, true);

  const list = user.lists[listIndex];
  const itemIndex = findIndex(list, itemId, false);

  list.listItems[itemIndex].text = text;
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

const deleteOneListItem = async (userId, listId, itemId) => {
  let user = await User.findOne({ id: userId });
  const listIndex = findIndex(user, listId, true);

  const list = user.lists[listIndex];
  const itemIndex = findIndex(list, itemId, false);

  list.listItems.splice(itemIndex, 1);
  await user.save();

  user = await User.findOne({ id: userId });
  return user.lists;
};

module.exports = {
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
  createOneListItem,
  updateOneListItem,
  deleteOneListItem
};
