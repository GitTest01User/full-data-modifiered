const express = require("express");
const multer = require("multer");

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpegStatic = require("ffmpeg-static");

const app = express();

ffmpeg.setFfmpegPath(ffmpegPath);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },

  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });
var {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateImage,
} = require("../controller/Gallery");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = express.Router();

router.get("/Status/Digi2l/Gallery", getProducts);
router.post("/Status/Digi2l/Gallery/Post",
upload.single("image"),
createProduct
);
router.patch("/Status/Digi2l/Gallery", updateProduct);
router.delete("/Status/Digi2l/Gallery", deleteProduct);
router.post(
  "/Status/Digi2l/Gallery/Image/update",
  upload.single("image"),

  updateImage
);

router.post(
  "/Status/Digi2l/Gallery/Video/upload",
  upload.single("video"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const inputPath = req.file.path;
    const outputPath = `compressed-${req.file.filename}`;

    ffmpeg(inputPath)
      .output(outputPath)
      .on("end", () => {
        res.download(outputPath, (err, req) => {
          if (err) {
            res.status(500).send("Error downloading the compressed file.");
          }
          res.status(200).send(req);
        });
      })
      .on("error", (err) => {
        console.error("Error during compression:", err);
        res.status(500).send("Error during compression.");
      })
      .run();
    try {
      const updatedBlog = await prisma.tblRegister.update({
        where: {
          Id: Number(req.query.Id),
        },
        data: {
          image_name: outputPath,
        },
      });

      res
        .status(200)
        .json({ Status: true, Message: "Update Success", result: updatedBlog });
      console.log(outputPath);
    } catch (error) {
      console.error(error);
      res.status(400).json({ Status: false, Message: "Internal Server Error" });
    }
  }
);

module.exports = router;
