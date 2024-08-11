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
  FileImageCreate,
  createProduct,
  updateProduct,
  deleteProduct,
  FileImageUpdate,
  FileUpload,
} = require("../controller/Blogs");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Blogs", getProducts);
router.post("/Status/Digi2l/Blogs/Post", createProduct);
router.patch("/Status/Digi2l/Blogs", updateProduct);
router.delete("/Status/Digi2l/Blogs", deleteProduct);
router.post(
  "/Status/Digi2l/Blogs/Image/Create",
  upload.single("image"),
  FileImageCreate
);
router.post(
  "/Status/Digi2l/Blogs/Image/Update",
  upload.single("image"),
  FileImageUpdate
);

router.post("/Status/Digi2l/single", upload.single("image"), (req, res) => {
  if (req.file) {
    res.status(200).json({ Status: true, Message: "Create Success", file: req.file.filename });
  } else {
    res.status(400).send("Please upload a valid image");
  }
});


module.exports = router;
