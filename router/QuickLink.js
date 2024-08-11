const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/QuickLink");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/QuickLink", getProducts);
router.post("/Status/Digi2l/QuickLink/Post", createProduct);
router.patch("/Status/Digi2l/QuickLink", updateProduct);
router.delete("/Status/Digi2l/QuickLink", deleteProduct);

module.exports = router;
