const express = require("express");

var {
  getProducts,

  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ProgramPartnership");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/ProgramPartnership", getProducts);
router.post("/Status/Digi2l/ProgramPartnership/Post", createProduct);
router.patch("/Status/Digi2l/ProgramPartnership", updateProduct);
router.delete("/Status/Digi2l/ProgramPartnership", deleteProduct);

module.exports = router;
