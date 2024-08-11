const express = require("express");

var {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Detail");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Detail", getProducts);
router.post("/Status/Digi2l/Detail/Post", createProduct);
router.patch("/Status/Digi2l/Detail", updateProduct);
router.delete("/Status/Digi2l/Detail", deleteProduct);

module.exports = router;
