const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.post("/", categoryController.add);
router.patch("/:id", categoryController.edit);
router.delete("/:id", categoryController.delete);

module.exports = router;
