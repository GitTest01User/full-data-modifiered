const express = require("express");

var {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/FollowIcon");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/FollowIcon", getProducts);
router.post("/Status/Digi2l/FollowIcon/Post", createProduct);
router.patch("/Status/Digi2l/FollowIcon", updateProduct);
router.delete("/Status/Digi2l/FollowIcon", deleteProduct);

module.exports = router;
