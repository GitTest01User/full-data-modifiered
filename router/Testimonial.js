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
  updateImage,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductImage,
} = require("../controller/Testimonials");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Testimonials", getProducts);
router.post("/Status/Digi2l/Testimonials/Post", createProduct);
router.patch("/Status/Digi2l/Testimonials", updateProduct);
router.delete("/Status/Digi2l/Testimonials", deleteProduct);

router.post(
  "/Status/Digi2l/Testimonials/Image/Post",

  upload.single("image"),

  createProductImage
);
router.post(
  "/Status/Digi2l/Testimonials/Image/update",
  upload.single("image"),
  updateImage
);
module.exports = router;
