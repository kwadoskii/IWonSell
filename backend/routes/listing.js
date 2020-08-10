const router = require("express").Router();
const listingController = require("../controllers/listingController");
const upload = require("../middlewares/multer");

router.get("/", listingController.getAll);
router.get("/user/:id", listingController.getUserListings);
router.get("/:id", listingController.getOne);
router.post(
  "/",
  upload.uploadImages,
  upload.resizeImages,
  upload.thumbnailImages,
  listingController.add
);
router.patch("/:id", listingController.edit);
router.delete("/:id", listingController.delete);

module.exports = router;
