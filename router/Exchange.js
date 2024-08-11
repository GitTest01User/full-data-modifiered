const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Exchange");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Exchange", getProducts);
router.post("/Status/Digi2l/Exchange/Post", createProduct);
router.patch("/Status/Digi2l/Exchange", updateProduct);
router.delete("/Status/Digi2l/Exchange", deleteProduct);

module.exports = router;
