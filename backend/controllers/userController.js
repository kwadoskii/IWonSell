const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const projections = ["firstname", "lastname", "email"];

exports.getAll = (req, res) => {
  User.find()
    .sort({ updatedAt: -1 })
    .select(projections)
    .then((user) => {
      res.status(200).send({
        status: "success",
        data: user,
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
  User.findById(id)
    .select(projections)
    .then((user) => {
      res.status(200).send({ status: "success", data: user });
    })
    .catch((err) => res.status(400).send({ status: "error", data: { error: err } }));
};

exports.add = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

  const user = new User({ firstname, lastname, email });
  user.password = hashPassword;
  user
    .save()
    .then(() => {
      res
        .status(201)
        .send({ status: "success", data: { message: "User added successfully" } });
    })
    .catch((err) => res.status(400).send({ status: "error", data: { error: err } }));
};

exports.edit = (req, res) => {
  const { id } = req.params;
  const { firstname, lastname } = req;

  User.findById(id).then((user) => {
    if (!user)
      res.status(400).send({ status: "error", data: { message: "User not found" } });
    User.findByIdAndUpdate(id, { firstname, lastname }, { new: true }).then((user) => {
      res.status(201).send({
        status: "success",
        data: {
          message: "User updated successfully",
          id: user._id,
        },
      });
    });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user)
        res.status(400).send({ status: "error", data: { message: "User not found" } });
      User.findByIdAndDelete(id)
        .then(() =>
          res
            .status(201)
            .send({ status: "success", data: { message: "User deleted successfully" } })
        )
        .catch((err) => res.status(400).send({ status: "error", data: { error: err } }));
    })
    .catch((err) => res.status(400).send({ status: "error", data: { error: err } }));
};
