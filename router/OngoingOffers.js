const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/OngoingOffers");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/OngoingOffers", getProducts);
router.post("/Status/Digi2l/OngoingOffers/Post", createProduct);
router.patch("/Status/Digi2l/OngoingOffers", updateProduct);
router.delete("/Status/Digi2l/OngoingOffers", deleteProduct);

module.exports = router;
