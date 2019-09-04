import axios from "./axios";

const token = sessionStorage.getItem("jwt");
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

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

export const logout = async () => {
  return await axios.post("/logout");
};

export const getAllLists = async username => {
  return await axios.get(`/users/${username}`, config);
};

export const createOneList = async username => {
  return await axios.post(`/users/${username}`, config);
};

export const updateOneList = async (username, id) => {
  return await axios.put(`/users/${username}/lists/${id}`, config);
};

export const deleteOneList = async (username, id) => {
  return await axios.delete(`/users/${username}/lists/${id}`, config);
};

export const overwriteListItems = async (username, id) => {
  return await axios.put(`/users/${username}/lists/${id}/items`, config);
};
