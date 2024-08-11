const express = require("express");

var {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Menu");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Header", getProducts);
router.post("/Status/Digi2l/Header/Post", createProduct);
router.patch("/Status/Digi2l/Header", updateProduct);
router.delete("/Status/Digi2l/Header", deleteProduct);

module.exports = router;
