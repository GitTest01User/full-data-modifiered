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
    const { LifeSilderId, LifeSilderisActive } = req.query;
    let tblLifeSilder;

    const whereClause = {};

    if (LifeSilderId) {
      whereClause.LifeSilderId = parseInt(LifeSilderId);
    }

    if (LifeSilderisActive) {
      whereClause.LifeSilderisActive =
        LifeSilderisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblLifeSilder = await prisma.tblLifeSilder.findMany({
        where: whereClause,
        orderBy: {
          LifeSilderId: "desc",
        },
      });
    } else {
      tblLifeSilder = await prisma.tblLifeSilder.findMany({
        orderBy: {
          LifeSilderId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblLifeSilder });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      LifeSilderTitle,
      LifeSilderimage,
      LifeSilderAlt,
      Author,
      IsActive,
      CreatedBy,

      ModifiedBy,
      ModifiedDate,
    } = req.body;

    if (LifeSilderimage != null) {
      var ImageNameNew;
      const base64String = LifeSilderimage;
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

    const newLifeSlider = await prisma.tblLifeSilder.create({
      data: {
        LifeSilderTitle,
        LifeSilderimage: ImageNameNew,
        LifeSilderAlt,
        LifeSilderisActive: true,
        IsActive,
        CreatedBy,
        CreatedDate: new Date(),
        Author,
        ModifiedBy,
        ModifiedDate,
      },
    });
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newLifeSlider });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      LifeSilderTitle,
      LifeSilderimage,
      LifeSilderAlt,
      LifeSilderisActive,
      IsActive,
      Author,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
    } = req.body;
    if (LifeSilderimage != null) {
      var ImageNameNew;
      const base64String = LifeSilderimage;
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

    const LifeSilderIds = req.query.LifeSilderId.split(",").map((id) =>
      Number(id)
    );

    const updatedSliderLifes = await Promise.all(
      LifeSilderIds.map(async (id) => {
        const updatedSliderLife = await prisma.tblLifeSilder.update({
          where: {
            LifeSilderId: id,
          },
          data: {
            LifeSilderTitle,
            LifeSilderimage: ImageNameNew,
            LifeSilderAlt,
            LifeSilderisActive,
            IsActive,
            Author,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

        return updatedSliderLife;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Update Success",
      result: updatedSliderLifes,
    });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const LifeSilderIds = req.query.LifeSilderId.split(",").map((id) =>
      Number(id)
    );

    const DeleteLifeSliders = await Promise.all(
      LifeSilderIds.map(async (id) => {
        const DeleteLifeSlider = await prisma.tblLifeSilder.delete({
          where: {
            LifeSilderId: id,
          },
        });

        return DeleteLifeSlider;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: DeleteLifeSliders,
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
