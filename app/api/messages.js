import client from "./client";

const endpoint = "/messages";

const getMessages = (userId) => {
  return client.get(`${endpoint}/${userId}`);
};

const getOneMessage = (messageId) => {
  return client.get(`${endpoint}/?id=${messageId}`);
};

const postMessage = (message) => {
  return client.post(endpoint, message);
};

export default {
  getMessages,
  getOneMessage,
  postMessage,
};
