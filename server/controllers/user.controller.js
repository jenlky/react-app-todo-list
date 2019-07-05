require("../models/user.model");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const createOneUser = async body => {
  const { name, username, email, password } = body;

  const saltRound = 10;
  const hash = await bcrypt.hash(password, saltRound);
  const user = new User({ name, username, email, password: hash });

  await user.save();
  return { _id: user._id, username: user.username };
};

const findAllLists = async username => {
  const user = await User.findOne({ username });
  return user.lists;
};

const createOneList = async username => {
  let user = await User.findOne({ username });
  const newList = {
    name: "",
    listItems: []
  };

  user.lists.push(newList);
  await user.save();
  return user.lists;
};

// update one list's name
const updateOneList = async (username, id, name) => {
  let user = await User.findOne({ username });
  const list = user.lists.find(list => list.id === Number(id));
  list.name = name;

  await user.save();
  return user.lists;
};

const findListIndex = (user, id) => {
  for (let x = 0; x < user.lists.length; x++) {
    if (user.lists[x].id === Number(id)) {
      return x;
    }
  }

  throw new Error("List Id cannot be found");
};

const deleteOneList = async (username, id) => {
  let user = await User.findOne({ username });
  const listIndex = findListIndex(user, id);

  user.lists.splice(listIndex, 1);
  await user.save();
  return user.lists;
};

const overwriteListItems = async (username, id, newList) => {
  let user = await User.findOne({ username });
  const listIndex = findListIndex(user, id);

  user.lists[listIndex].listItems = newList.listItems;
  await user.save();
  return user.lists[listIndex].listItems;
};

module.exports = {
  createOneUser,
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
  overwriteListItems
};
