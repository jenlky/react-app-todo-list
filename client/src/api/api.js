import axios from "./axios";

const insertAuthorization = () => {
  const token = sessionStorage.getItem("jwt");
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

const domain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_URI;

export const signUp = async (name, username, email, password) => {
  return await axios.post(`${domain}/signup`, {
    name,
    username,
    email,
    password
  });
};

export const login = async (username, password) => {
  return await axios.post(`${domain}/login`, {
    username,
    password
  });
};

export const logout = async () => {
  return await axios.post(`${domain}/logout`, insertAuthorization());
};

export const getAllLists = async username => {
  return await axios.get(`${domain}/users/${username}`, insertAuthorization());
};

export const createOneList = async username => {
  return await axios.post(
    `${domain}/users/${username}`,
    "",
    insertAuthorization()
  );
};

export const updateOneList = async (username, index, requestBody) => {
  return await axios.put(
    `${domain}/users/${username}/lists/${index}`,
    requestBody,
    insertAuthorization()
  );
};

export const deleteOneList = async (username, index) => {
  return await axios.delete(
    `${domain}/users/${username}/lists/${index}`,
    insertAuthorization()
  );
};

export const overwriteListItems = async (username, index, requestBody) => {
  return await axios.put(
    `${domain}/users/${username}/lists/${index}/items`,
    requestBody,
    insertAuthorization()
  );
};
