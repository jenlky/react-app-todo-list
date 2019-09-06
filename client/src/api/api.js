import axios from "./axios";

const insertAuthorization = () => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
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
  return await axios.post("/logout", insertAuthorization());
};

export const getAllLists = async username => {
  return await axios.get(`/users/${username}`, insertAuthorization());
};

export const createOneList = async username => {
  return await axios.post(`/users/${username}`, "", insertAuthorization());
};

export const updateOneList = async (username, reqBody, index) => {
  return await axios.put(
    `/users/${username}/lists/${index}`,
    reqBody,
    insertAuthorization()
  );
};

export const deleteOneList = async (username, index) => {
  return await axios.delete(
    `/users/${username}/lists/${index}`,
    insertAuthorization()
  );
};

export const overwriteListItems = async (username, index) => {
  return await axios.put(
    `/users/${username}/lists/${index}/items`,
    insertAuthorization()
  );
};
