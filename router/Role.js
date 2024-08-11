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
 
} = require("../controller/Role");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Role", getProducts);
router.post("/Status/Digi2l/Role/Post", createProduct);
router.patch("/Status/Digi2l/Role", updateProduct);
router.delete("/Status/Digi2l/Role", deleteProduct);


module.exports = router;
