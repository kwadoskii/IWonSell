const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAll);
router.get("/:id", userController.getOne);
router.post("/", userController.add);
router.patch("/:id", userController.edit);
router.delete("/:id", userController.delete);

module.exports = router;
