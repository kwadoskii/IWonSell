const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadFiles = upload.array("images", 10);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).send("Too many files to upload.");
      }
    } else if (err) {
      return res.status(400).send(err);
    }

    next();
  });
};

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.url = [];
  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `iwonsell_${filename}_full.jpeg`; //append userId here

      await sharp(file.buffer)
        // .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`uploads/${newFilename}`);

      req.body.url.push(newFilename);
    })
  );

  next();
};

const thumbnailImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.thumbnailUrl = [];
  await Promise.all(
    req.files.map(async (file) => {
      const filename = file.originalname.replace(/\..+$/, "");
      const newFilename = `iwonsell_${filename}_thumb.jpeg`;

      await sharp(file.buffer)
        .toFormat("jpeg")
        .jpeg({ quality: 15 })
        .toFile(`uploads/${newFilename}`);

      req.body.thumbnailUrl.push(newFilename);
    })
  );

  next();
};

module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  thumbnailImages: thumbnailImages,
};
