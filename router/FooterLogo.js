
const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/FooterLogo");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/FooterLogo", getProducts);
router.post("/Status/Digi2l/FooterLogo/Post", createProduct);
router.patch("/Status/Digi2l/FooterLogo", updateProduct);
router.delete("/Status/Digi2l/FooterLogo", deleteProduct);

module.exports = router;
