const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/BrowserRoute");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/BrowserRouter", getProducts);
router.post("/Status/Digi2l/BrowserRouter/Post", createProduct);
router.patch("/Status/Digi2l/BrowserRouter", updateProduct);
router.delete("/Status/Digi2l/BrowserRouter", deleteProduct);

module.exports = router;
