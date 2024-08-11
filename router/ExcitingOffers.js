const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ExcitingOffers");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/ExcitingOffers", getProducts);
router.post("/Status/Digi2l/ExcitingOffers/Post", createProduct);
router.patch("/Status/Digi2l/ExcitingOffers", updateProduct);
router.delete("/Status/Digi2l/ExcitingOffers", deleteProduct);

module.exports = router;
