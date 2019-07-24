require("../models/user.model");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const createOneUser = async user => {
  const { name, username, email, password } = user;

  const saltRound = 10;
  const hash = await bcrypt.hash(password, saltRound);
  const newUser = new User({ name, username, email, password: hash });

  await newUser.save();
  return { _id: newUser._id, username: newUser.username };
};

const findOneUser = async user => {
  const foundUser = await User.findOne({ username: user.username });
  const isUser = await bcrypt.compare(user.password, foundUser.password);

  if (isUser) {
    return { username: user.username };
  } else {
    throw new Error("User not found");
  }
};

const checkPayload = async username => {
  return await User.findOne({ username });
};

const findAllLists = async username => {
  const user = await User.findOne({ username });
  return user.lists;
};

// forgot to add id
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
  findOneUser,
  checkPayload,
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
  overwriteListItems
};
