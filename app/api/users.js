import client from "./client";

const endpoint = "/users";

const register = (cred) => {
  return client.post(endpoint, cred);
};

const getOne = (id) => {
  return client.get(`${endpoint}/${id}`);
};

export default {
  register,
  getOne,
};
