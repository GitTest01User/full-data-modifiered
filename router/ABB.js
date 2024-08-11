const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ABB");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Abb", getProducts);
router.post("/Status/Digi2l/Abb/Post", createProduct);
router.patch("/Status/Digi2l/Abb", updateProduct);
router.delete("/Status/Digi2l/Abb", deleteProduct);

module.exports = router;


