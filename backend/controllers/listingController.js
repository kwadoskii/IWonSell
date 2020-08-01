const Listing = require("../models/listingModel");

exports.getAll = (req, res) => {
  Listing.find()
    .sort({ updatedAt: -1 })
    .then((listings) => {
      res.status(200).send({
        status: "success",
        data: listings,
      });
    })
    .catch((err) =>
      res.status(400).send({
        status: "error",
        data: { error: err },
      })
    );
};

exports.getOne = (req, res) => {
  const { id } = req.params;
  Listing.findOne({ _id: id })
    .then((listing) => {
      if (!listing)
        res.status(400).send({ status: "error", data: { message: "Listing not found" } });
      res.status(200).send({
        status: "success",
        data: listing,
      });
    })
    .catch((err) =>
      res.status(400).send({
        status: "error",
        data: { error: err },
      })
    );
};

exports.add = (req, res) => {
  const {
    title,
    price,
    description,
    location,
    category,
    url,
    thumbnailUrl,
    user,
  } = req.body;

  const arrangeImages = () => {
    let final = [];
    for (let key in url) {
      final.push({
        url: process.env.UPLOAD_PATH + url[key],
        thumbnailUrl: process.env.UPLOAD_PATH + url[key].replace("_full.", "_thumb."),
      });
    }
    return final;
  };

  const images = arrangeImages();

  const listing = new Listing({
    title,
    price,
    description,
    category,
    user,
    images,
  });

  if (location) listing.location = JSON.parse(location);

  listing
    .save()
    .then(() => {
      res.status(200).send({
        status: "success",
        data: {
          message: "Listing added successfully",
        },
      });
    })
    .catch((err) =>
      res.status(400).send({
        status: "error",
        data: { error: err },
      })
    );
};

exports.edit = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Listing.findById(id).then((listing) => {
    if (!listing)
      res.status(400).send({ status: "error", data: { message: "Listing not found" } });
    Listing.findByIdAndUpdate(id, { ...body }, { new: true }).then((listing) => {
      res.status(201).send({
        status: "success",
        data: {
          message: "Listing updated successfully",
          id: listing._id,
        },
      });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  Listing.findById(id)
    .then((listing) => {
      if (!listing)
        res.status(400).send({ status: "error", data: { message: "Listing not found" } });
      Listing.findByIdAndDelete(id)
        .then(() => {
          res.status(201).send({
            status: "success",
            data: {
              message: "Listing deleted successfully",
            },
          });
        })
        .catch((err) =>
          res.status(400).send({
            status: "error",
            data: { error: err },
          })
        );
    })
    .catch((err) =>
      res.status(400).send({
        status: "error",
        data: { error: err },
      })
    );
};
