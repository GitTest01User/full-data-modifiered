const express = require("express");

var {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Follow");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Follow", getProducts);
router.post("/Status/Digi2l/Follow/Post", createProduct);
router.patch("/Status/Digi2l/Follow", updateProduct);
router.delete("/Status/Digi2l/Follow", deleteProduct);

module.exports = router;
