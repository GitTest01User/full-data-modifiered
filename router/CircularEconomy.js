const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/CircularEconomy");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/CircularEconomy", getProducts);
router.post("/Status/Digi2l/CircularEconomy/Post", createProduct);
router.patch("/Status/Digi2l/CircularEconomy", updateProduct);
router.delete("/Status/Digi2l/CircularEconomy", deleteProduct);

module.exports = router;
