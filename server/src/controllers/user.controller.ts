import "../models/user.model";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model";

interface UserType extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  lists: Array<{
    id: number;
    name: string;
    listItems: [];
  }>;
}

const createOneUser = async (user: UserType) => {
  console.log(user);
  const { name, username, email, password } = user;
  const saltRound = 10;
  const hash = await bcrypt.hash(password, saltRound);
  const newUser = new User({ name, username, email, password: hash });

  await newUser.save();
  return { _id: newUser._id, username: newUser.username };
};

const findOneUser = async (user: UserType) => {
  const foundUser = await User.findOne({ username: user.username });
  const isUser = await bcrypt.compare(user.password, foundUser.password);

  if (isUser) {
    return { _id: foundUser._id, username: foundUser.username };
  } else {
    throw new Error("User not found");
  }
};

const checkPayload = async (username: UserType["username"]) => {
  return await User.findOne({ username });
};

const findAllLists = async (username: UserType["username"]) => {
  const user = await User.findOne({ username });
  return user.lists;
};

const createOneList = async (username: UserType["username"]) => {
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

const updateOneList = async (
  username: UserType["username"],
  index: number,
  name: UserType["name"]
) => {
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

const deleteOneList = async (username: UserType["username"], index: number) => {
  let user = await User.findOne({ username });
  user.lists.splice(index, 1);

  await user.save();
  return user.lists;
};

const overwriteListItems = async (
  username: UserType["username"],
  index: number,
  newListItems: UserType["lists"]["listItems"]
) => {
  let user = await User.findOne({ username });
  user.lists[index].listItems = newListItems;

  await user.save();
  return user.lists[index].listItems;
};

export {
  createOneUser,
  findOneUser,
  checkPayload,
  findAllLists,
  createOneList,
  updateOneList,
  deleteOneList,
  overwriteListItems
};
