const express = require("express");

var {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Footer");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Footer", getProducts);
router.post("/Status/Digi2l/Footer/Post", createProduct);
router.patch("/Status/Digi2l/Footer", updateProduct);
router.delete("/Status/Digi2l/Footer", deleteProduct);

module.exports = router;
