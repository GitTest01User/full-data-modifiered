
const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/logo");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Logo", getProducts);
router.post("/Status/Digi2l/Logo/Post", createProduct);
router.patch("/Status/Digi2l/Logo", updateProduct);
router.delete("/Status/Digi2l/Logo", deleteProduct);

module.exports = router;
