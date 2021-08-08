const multer = require("multer");
const path = require("path");
const AppError = require("../appError/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("FILE IS NOT AN IMAGE", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
  // limits: {
  //   fileSize: 1048576,
  // },
});

exports.uploadEditorImage = upload.single("editorImage");
exports.uploadPostImage = upload.single("postImage");
exports.uploadImageUrl = upload.single("image_url");
exports.uploadVideoUrl = upload.single("video_url");
exports.uploadattaches = upload.array("images", 12);
exports.uploadPackageImage = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);
exports.uploadPackageImage2 = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "icon", maxCount: 1 },
]);
