const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/CorporateEnquiry");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/CorporateEnquiry", getProducts);
router.post("/Status/Digi2l/CorporateEnquiry/Post", createProduct);
router.patch("/Status/Digi2l/CorporateEnquiry", updateProduct);
router.delete("/Status/Digi2l/CorporateEnquiry", deleteProduct);

module.exports = router;
