const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/LogisticsPartnership");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/LogisticsPartnership", getProducts);
router.post("/Status/Digi2l/LogisticsPartnership/Post", createProduct);
router.patch("/Status/Digi2l/LogisticsPartnership", updateProduct);
router.delete("/Status/Digi2l/LogisticsPartnership", deleteProduct);

module.exports = router;
