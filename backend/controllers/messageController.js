const Message = require("../models/messageModel");

exports.getAll = (req, res) => {
  Message.find()
    .sort({ updatedAt: -1 })
    .then((messages) => {
      res.status(200).send({
        status: "success",
        data: messages,
      });
    })
    .catch((err) => res.status(400).send({ status: "error", data: { error: err } }));
};

exports.getUserMessages = (req, res) => {
  const { userId } = req.params;

  Message.find({ $or: [{ buyer: userId }, { seller: userId }] })
    .sort({ createdAt: -1 })
    .populate([
      { path: "seller", select: ["firstname", "lastname"], model: "User" },
      { path: "buyer", select: ["firstname", "lastname"], model: "User" },
      {
        path: "listing",
        select: ["title", "price", "description", "images"],
        model: "Listing",
      },
    ])
    .then((messages) => {
      if (!messages)
        res
          .status(400)
          .send({ status: "error", data: { message: "Message not found the user" } });

      res.status(200).send({
        status: "success",
        data: messages,
      });
    })
    .catch((err) => {
      res.send(400).send({ status: "error", data: { error: err } });
    });
};

exports.add = (req, res) => {
  const { seller, buyer, listing, message, buyerSeller } = req.body;

  Message.find({ $and: [{ buyer: buyer }, { seller: seller }, { listing: listing }] })
    .then((threadExists) => {
      const newMessages = {
        message,
        time: new Date(),
        buyerSeller, //message sender ID
      };

      if (threadExists.length !== 0) {
        Message.findByIdAndUpdate(
          threadExists[0]._id,
          { $push: { messages: newMessages } },
          { new: true }
        )
          .then((messages) => {
            res.status(201).send(messages);
          })
          .catch((err) => res.status(400).send({ err: err }));
      } else {
        const newMessage = new Message({ seller, buyer, listing, message });

        newMessage
          .save()
          .then((message) => {
            res.status(201).send({
              status: "success",
              data: message,
            });
          })
          .catch((err) => {
            res.status(400).send({ err: err });
          });
      }
    })
    .catch((err) => {
      res.send(400).send({ status: "error", data: { error: err } });
    });
};

exports.getOne = (req, res) => {
  const { id } = req.query;

  Message.findOne({ _id: id })
    .select(["messages"])
    .then((message) => {
      res.status(200).send({
        status: "success",
        data: message,
      });
    })
    .catch((err) => res.status(400).send({ err: err }));
};
