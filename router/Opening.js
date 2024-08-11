const express = require("express");

var {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/Openings");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Openings", getProducts);
router.post("/Status/Digi2l/Openings/Post", createProduct);
router.patch("/Status/Digi2l/Openings", updateProduct);
router.delete("/Status/Digi2l/Openings", deleteProduct);

module.exports = router;
