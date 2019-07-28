import axios from "./axios";

export const getAllLists = async username => {
  return await axios.get(`/users/${username}`);
};

export const createOneList = async username => {
  return await axios.post(`/users/${username}`);
};

export const updateOneList = async (username, id) => {
  return await axios.get(`/users/${username}/lists/${id}`);
};

export const deleteOneList = async (username, id) => {
  return await axios.delete(`/users/${username}/lists/${id}`);
};

export const overwriteListItems = async (username, id) => {
  return await axios.delete(`/users/${username}/lists/${id}/items`);
};
