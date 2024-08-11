const express = require("express");




var {
  getProducts,
 
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/BlogsCategory");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/BlogsCategory", getProducts);
router.post("/Status/Digi2l/BlogsCategory/Post", createProduct);
router.patch("/Status/Digi2l/BlogsCategory", updateProduct);
router.delete("/Status/Digi2l/BlogsCategory", deleteProduct);

module.exports = router;
