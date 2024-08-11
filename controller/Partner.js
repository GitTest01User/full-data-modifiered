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
    const { PartnerId, PartnerISActive } = req.query;
    let tblPartner;

    const whereClause = {};

    if (PartnerId) {
      whereClause.PartnerId = parseInt(PartnerId);
    }

    if (PartnerISActive) {
      whereClause.PartnerISActive = PartnerISActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblPartner = await prisma.tblPartner.findMany({
        where: whereClause,
        orderBy: {
          PartnerId: "desc",
        },
      });
    } else {
      tblPartner = await prisma.tblPartner.findMany({
        orderBy: {
          PartnerId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblPartner });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const { PartnerImage, PartnerISActive, CreatedBy, PartnerTitle, Author } =
      req.body;
    const existingLink = await prisma.tblPartner.findFirst({
      where: {
        PartnerTitle,
      },
    });
    if (existingLink) {
      return res.status(400).json({
        status: false,
        Message: "Title already using database!",
      });
    }

    if (PartnerImage != null) {
      var ImageNameNew;
      const base64String = PartnerImage;
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
    const updatedPartner = await prisma.tblPartner.create({
      data: {
        PartnerImage: ImageNameNew,
        PartnerAlt: "Digi2l",
        PartnerISActive,
        CreatedBy,
        PartnerTitle,
        Author,
        CreatedDate: new Date(),
      },
    });

    res
      .status(200)
      .json({ Status: true, Message: "Create Success", result: updatedPartner });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      PartnerImage,
      PartnerISActive,
      ModifiedBy,
      IsActive,
      CreatedBy,
      PartnerTitle,
      Author,
    } = req.body;

    if (PartnerImage != null) {
      var ImageNameNew;
      const base64String = PartnerImage;
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

    const PartnerIds = req.query.PartnerId.split(",").map((id) => Number(id));
    var updatedPartners = await Promise.all(
      PartnerIds.map(async (id) => {
        var updatedPartner = await prisma.tblPartner.update({
          where: {
            PartnerId: id,
          },
          data: {
            PartnerImage: ImageNameNew,
            ModifiedBy,
            PartnerTitle,
            PartnerAlt: "Digi2l",
            PartnerISActive,
            ModifiedDate: new Date(),
            IsActive,
            Author,
            CreatedBy,
          },
        });
        return updatedPartner;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedPartners });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const PartnerIds = req.query.PartnerId.split(",").map((id) => Number(id));
    var updatedPartners = await Promise.all(
      PartnerIds.map(async (id) => {
        const deletedPartner = await prisma.tblPartner.delete({
          where: {
            PartnerId: id,
          },
        });
        return deletedPartner;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: updatedPartners });
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
