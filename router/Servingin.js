const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ServingIn");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Servingin", getProducts);
router.post("/Status/Digi2l/Servingin/Post", createProduct);
router.patch("/Status/Digi2l/Servingin", updateProduct);
router.delete("/Status/Digi2l/Servingin", deleteProduct);

module.exports = router;
