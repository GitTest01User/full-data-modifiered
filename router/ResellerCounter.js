const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ResellerCounter");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Counter", getProducts);
router.post("/Status/Digi2l/Counter/Post", createProduct);
router.patch("/Status/Digi2l/Counter", updateProduct);
router.delete("/Status/Digi2l/Counter", deleteProduct);

module.exports = router;
