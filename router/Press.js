// const express = require("express");

// var {
//   getProducts,

//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controller/Press");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const router = express.Router();

// router.get("/Status/Digi2l/Press", getProducts);
// router.post("/Status/Digi2l/Press/Post", createProduct);
// router.patch("/Status/Digi2l/Press", updateProduct);
// router.delete("/Status/Digi2l/Press", deleteProduct);

// module.exports = router;







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
} = require("../controller/Press");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Press", getProducts);
router.post("/Status/Digi2l/Press/Post", createProduct);
router.patch("/Status/Digi2l/Press", updateProduct);
router.delete("/Status/Digi2l/Press", deleteProduct);
router.post(
  "/Status/Digi2l/Press/Image/update",
  upload.single("image"),
  updateImage
);
module.exports = router;

