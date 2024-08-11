
const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/LifeSlider");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/LifeSlider", getProducts);
router.post("/Status/Digi2l/LifeSlider/Post", createProduct);
router.patch("/Status/Digi2l/LifeSlider", updateProduct);
router.delete("/Status/Digi2l/LifeSlider", deleteProduct);

module.exports = router;
