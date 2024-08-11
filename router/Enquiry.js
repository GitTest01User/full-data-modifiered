const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Enquiry");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Enquiry", getProducts);
router.post("/Status/Digi2l/Enquiry/Post", createProduct);
router.patch("/Status/Digi2l/Enquiry", updateProduct);
router.delete("/Status/Digi2l/Enquiry", deleteProduct);

module.exports = router;
