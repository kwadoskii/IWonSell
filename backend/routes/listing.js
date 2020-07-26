const router = require("express").Router();
const listingController = require("../controllers/listingController");

router.get("/", listingController.getAll);
router.get("/:id", listingController.getOne);
router.post("/", listingController.add);
router.patch("/:id", listingController.edit);
router.delete("/:id", listingController.delete);

module.exports = router;
