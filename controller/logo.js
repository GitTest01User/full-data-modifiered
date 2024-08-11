const { PrismaClient } = require("@prisma/client");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const prisma = new PrismaClient();
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

getProducts = async (req, res) => {
  try {
    const { Id, LogoIsActive } = req.query;
    let tbllogo;

    const whereClause = {};

    if (Id) {
      whereClause.Id = parseInt(Id);
    }

    if (LogoIsActive) {
      whereClause.LogoIsActive = LogoIsActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tbllogo = await prisma.tbllogo.findMany({
        where: whereClause,
      });
    } else {
      tbllogo = await prisma.tbllogo.findMany({
        orderBy: {
          Id: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tbllogo });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const { Title, Image, PermaLink, Author } = req.body;
    if (Image != null) {
      var ImageNameNew;
      const base64String = HeaderIcon;
      if (base64String.startsWith("data:image/svg+xml;base64,")) {
        const base64Data = base64String.replace(
          "data:image/svg+xml;base64,",
          ""
        );
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.svg`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNew = imagePath.replace("./public/Images/", "");
        console.log("SVG Image saved successfully!", ImageNameNew);
      } else if (base64String.startsWith("data:image/")) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.png`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNew = imagePath.replace("./public/Images/", "");
        console.log("PNG/JPEG Image saved successfully!", ImageNameNew);
      } else {
        console.log("Unsupported image format.");
      }
    }

    const newLogoFront = await prisma.tbllogo.create({
      data: {
        Title,
        Image: ImageNameNew,

        LogoIsActive: true,
        PermaLink,
        Date: new Date(),
        Author,
      },
    });
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newLogoFront });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      Title,
      Image,

      LogoIsActive,
      PermaLink,
      
      Author,
    } = req.body;
    if (Image != null) {
        var ImageNameNew;
        const base64String = Image;
        if (base64String.startsWith("data:image/svg+xml;base64,")) {
          const base64Data = base64String.replace(
            "data:image/svg+xml;base64,",
            ""
          );
          const buffer = Buffer.from(base64Data, "base64");
          const imagePath = `./public/Images/${Date.now()}_image.svg`;
          fs.writeFileSync(imagePath, buffer);
          ImageNameNew = imagePath.replace("./public/Images/", "");
          console.log("SVG Image saved successfully!", ImageNameNew);
        } else if (base64String.startsWith("data:image/")) {
          const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, "base64");
          const imagePath = `./public/Images/${Date.now()}_image.png`;
          fs.writeFileSync(imagePath, buffer);
          ImageNameNew = imagePath.replace("./public/Images/", "");
          console.log("PNG/JPEG Image saved successfully!", ImageNameNew);
        } else {
          console.log("Unsupported image format.");
        }
    }

    const updatedSliderLife = await prisma.tbllogo.update({
      where: {
        Id: Number(req.query.Id),
      },
      data: {
        Title,
        Image: ImageNameNew,

        LogoIsActive,
        PermaLink,
        Date: new Date(),
        Author,
      },
    });

    res.status(200).json({
      Status: true,
      Message: "Update Success",
      result: updatedSliderLife,
    });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const Ids = req.query.Id.split(",").map((id) => Number(id));

    const DeleteLogo = await Promise.all(
      Ids.map(async (id) => {
        const DeleteLifeSlider = await prisma.tbllogo.delete({
          where: {
            Id: id,
          },
        });

        return DeleteLifeSlider;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: DeleteLogo,
    });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
