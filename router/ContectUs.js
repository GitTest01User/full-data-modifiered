const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ContectUs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/ContectUs", getProducts);
router.post("/Status/Digi2l/ContectUs/Post", createProduct);
router.patch("/Status/Digi2l/ContectUs", updateProduct);
router.delete("/Status/Digi2l/ContectUs", deleteProduct);

module.exports = router;
