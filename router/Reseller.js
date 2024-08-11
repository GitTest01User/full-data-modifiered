const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Reseller");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Reseller", getProducts);
router.post("/Status/Digi2l/Reseller/Post", createProduct);
router.patch("/Status/Digi2l/Reseller", updateProduct);
router.delete("/Status/Digi2l/Reseller", deleteProduct);

module.exports = router;
