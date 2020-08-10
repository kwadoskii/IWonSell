const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const User = require("../models/userModel");

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .select(["firstname", "lastname", "email", "password"])
    .then((user) => {
      if (!bcryptjs.compareSync(password, user.password))
        res
          .status(400)
          .send({ status: "error", data: { message: "Invalid email and/or password" } });

      const token = jwt.sign(
        {
          user: {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            id: user._id,
          },
        },
        process.env.TOKEN_SECRET
      );
      res.status(200).send({ status: "success", data: token });
    })
    .catch((err) => res.status(400).send({ status: "error", data: { error: err } }));
};
