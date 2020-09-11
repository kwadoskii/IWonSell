const router = require("express").Router();
const messageController = require("../controllers/messageController");

// router.get("/", messageController.getAll);
router.get("/", messageController.getOne);
router.get("/:userId", messageController.getUserMessages);
router.post("/", messageController.add);
// router.patch("/:id", messageController.newChat);
// router.delete("/:id", messageController.delete);

module.exports = router;
