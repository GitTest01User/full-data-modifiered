const express = require("express");

var {
  getProducts,
  passwordRequest,
  resetToken,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ResetPassword");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/ResetPassword", getProducts);
router.post("/Status/Digi2l/ResetPassword/Post", createProduct);
router.patch("/Status/Digi2l/ResetPassword", updateProduct);
router.delete("/Status/Digi2l/ResetPassword", deleteProduct);
router.post("/Status/Digi2l/ResetLink", passwordRequest);
router.post("/Status/Digi2l/ResetPassword", resetToken, resetToken);
module.exports = router;
