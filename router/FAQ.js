const express = require("express");

var {

  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/FAQ");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/FAQ", getProducts);
router.post("/Status/Digi2l/FAQ/Post", createProduct);
router.patch("/Status/Digi2l/FAQ", updateProduct);
router.delete("/Status/Digi2l/FAQ", deleteProduct);

module.exports = router;
