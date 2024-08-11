const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/User");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Register", getProducts);
router.post("/Status/Digi2l/Register/Post", createProduct);
router.patch("/Status/Digi2l/Register", updateProduct);
router.delete("/Status/Digi2l/Register", deleteProduct);

module.exports = router;
