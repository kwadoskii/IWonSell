const Category = require("../models/categoryModel");

exports.getAll = (req, res) => {
  Category.find()
    .sort({ name: 1 })
    .select("name")
    .then((categories) => {
      res.status(200).send({
        status: "success",
        data: categories,
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
  Category.findOne({ _id: id })
    .select("name")
    .then((category) => {
      if (!category)
        res
          .status(400)
          .send({ status: "error", data: { message: "Category not found" } });
      res.status(200).send({
        status: "success",
        data: category,
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
  const { name } = req.body;
  const category = new Category({ name });

  category
    .save()
    .then(() => {
      res.status(200).send({
        status: "success",
        data: {
          message: "Category added successfully",
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
  const { name } = req.body;
  const { id } = req.params;

  Category.findById(id)
    .then((category) => {
      if (!category)
        res
          .status(400)
          .send({ status: "error", data: { message: "Category not found" } });
      Category.findByIdAndUpdate(id, { name }, { new: true })
        .then((category) => {
          res.status(201).send({
            status: "success",
            data: {
              message: "Category Updated successfully",
              id: category._id,
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

exports.delete = (req, res) => {
  const { id } = req.params;

  Category.findById(id)
    .then((category) => {
      if (!category)
        res
          .status(400)
          .send({ status: "error", data: { message: "Category not found" } });
      Category.findByIdAndDelete(id)
        .then(() => {
          res.status(201).send({
            status: "success",
            data: {
              message: "Category Deleted successfully",
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
