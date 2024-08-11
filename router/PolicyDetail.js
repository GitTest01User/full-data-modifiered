const express = require("express");

const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();
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
} = require("../controller/PolicyCondition");


router.get("/Status/Digi2l/PolicyDetail", getProducts);
router.post("/Status/Digi2l/PolicyDetail/Post", createProduct);
router.patch("/Status/Digi2l/PolicyDetail", updateProduct);
router.delete("/Status/Digi2l/PolicyDetail", deleteProduct);

router.post("/Status/Digi2l/single", upload.single("image"), (req, res) => {
  if (req.file) {
    res.status(200).json({ Status: true, Message: "Create Success", file: req.file.filename });
  } else {
    res.status(400).send("Please upload a valid image");
  }
});

module.exports = router;
