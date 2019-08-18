import axios from "./axios";

export const signUp = async (name, username, email, password) => {
  return await axios.post(`/signup`, {
    name,
    username,
    email,
    password
  });
};

export const login = async (username, password) => {
  return await axios.post(`/login`, {
    username,
    password
  });
};

export const getAllLists = async username => {
  return await axios.get(`/users/${username}`);
};

export const createOneList = async username => {
  return await axios.post(`/users/${username}`);
};

export const updateOneList = async (username, id) => {
  return await axios.put(`/users/${username}/lists/${id}`);
};

export const deleteOneList = async (username, id) => {
  return await axios.delete(`/users/${username}/lists/${id}`);
};

export const overwriteListItems = async (username, id) => {
  return await axios.put(`/users/${username}/lists/${id}/items`);
};
