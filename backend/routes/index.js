const router = require("express").Router();

const auth = require("./auth");
const category = require("./category");
const listing = require("./listing");
const verify = require("../middlewares/verifty");
const user = require("./user");

router.use("/auth", auth);
router.use("/category", category);
router.use("/listings", listing);
router.use("/users", user);

router.use(function (req, res) {
  res.status(400).send({
    status: "error",
    data: {
      error: "Invalid endpoint reached!",
    },
  });
});

module.exports = router;
