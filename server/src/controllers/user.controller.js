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
    return { _id: foundUser._id, username: foundUser.username };
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

const createOneList = async username => {
  const user = await User.findOne({ username });
  let greatestId = 0;
  for (let x = 0; x < user.lists.length; x++) {
    if (user.lists[x].id > greatestId) {
      greatestId = user.lists[x].id;
    }
  }

  const newList = {
    id: greatestId + 1,
    name: "",
    listItems: []
  };
  user.lists.push(newList);
  await user.save();
  return newList;
};

const updateOneList = async (username, index, name) => {
  let user = await User.findOne({ username });
  user.lists[index].name = name;
  const updatedList = {
    id: user.lists[index].id,
    name: user.lists[index].name,
    listItems: user.lists[index].listItems
  };

  await user.save();
  return updatedList;
};

const findListIndex = (user, id) => {
  for (let x = 0; x < user.lists.length; x++) {
    if (user.lists[x].id === Number(id)) {
      return x;
    }
  }
  throw new Error("List Id cannot be found");
};

const deleteOneList = async (username, index) => {
  let user = await User.findOne({ username });
  user.lists.splice(index, 1);

  await user.save();
  return user.lists;
};

const overwriteListItems = async (username, index, newList) => {
  let user = await User.findOne({ username });
  user.lists[index].listItems = newList.listItems;

  await user.save();
  return user.lists[index].listItems;
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
