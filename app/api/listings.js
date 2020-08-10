import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("description", listing.description);
  data.append("category", listing.category._id);
  data.append("user", listing.user);

  listing.images.forEach((image) =>
    data.append("images", {
      name: image,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location) data.append("location", JSON.stringify(listing.location));
  return client.post(endpoint, data, {
    onUploadProgress: (progress) => onUploadProgress(progress.loaded / progress.total),
  });
};

const getUserListings = (userId) => {
  return client.get(`${endpoint}/user/${userId}`);
};

export default {
  addListing,
  getListings,
  getUserListings,
};
