const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/About");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/About", getProducts);
router.post("/Status/Digi2l/About/Post", createProduct);
router.patch("/Status/Digi2l/About", updateProduct);
router.delete("/Status/Digi2l/About", deleteProduct);

module.exports = router;
