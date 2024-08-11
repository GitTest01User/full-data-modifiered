const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
  // updateImage,
  // createProductImage
} = require("../controller/Partner");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Partner", getProducts);
router.post("/Status/Digi2l/Partner/Post", createProduct);
router.patch("/Status/Digi2l/Partner", updateProduct);
router.delete("/Status/Digi2l/Partner", deleteProduct);

// router.post(
//   "/Status/Digi2l/Partner/Image/Post",

//   upload.single("image"),

//   createProductImage
// );
// router.post(
//   "/Status/Digi2l/Partner/Image/update",
//   upload.single("image"),
//   updateImage
// );
module.exports = router;
