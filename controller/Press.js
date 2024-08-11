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
    const { id, PressISActive } = req.query;

    let tblPress;

    const whereClause = {};

    if (id) {
      whereClause.id = parseInt(id);
    }

    if (PressISActive) {
      whereClause.PressISActive = PressISActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblPress = await prisma.tblPress.findMany({
        where: whereClause,
        orderBy: {
          id: "desc",
        },
      });
    } else {
      tblPress = await prisma.tblPress.findMany({
        orderBy: {
          id: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblPress });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ Status: false, Message: "Internal Server Error", error: error });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      PressTitle,
      PressAuthor,
      PressImage,
      Author,
      PressDescription,
      PressDate,

      IsActive,
      CreatedBy,
      ModifiedBy,
      ModifiedDate,
      PressLink,
    } = req.body;
  

    if (PressImage != null) {
      var ImageNameNew;
      const base64String = PressImage;
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

    const newPressBlog = await prisma.tblPress.create({
      data: {
        PressTitle,
        PressAuthor,
        PressImage: ImageNameNew,
        PressFeaturedImageAlt: "Digi2l",
        PressDescription,
        PressDate,
        Author,
        PressISActive: true,
        IsActive,
        PressLink,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newPressBlog });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      PressTitle,
      PressAuthor,
      Author,
      PressImage,
      PressFeaturedImageAlt,
      PressDescription,
      PressDate,
      PressISActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      PressLink,
      ModifiedBy,
    } = req.body;

    if (PressImage != null) {
      var ImageNameNew;
      const base64String = PressImage;
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

    const ids = req.query.id.split(",").map((id) => Number(id));

    const updatedPressBlogs = await Promise.all(
      ids.map(async (id) => {
        const updatedPressBlog = await prisma.tblPress.update({
          where: {
            id: id,
          },
          data: {
            PressTitle,
            PressAuthor,
            PressImage: ImageNameNew,
            PressFeaturedImageAlt,
            PressDescription,
            PressDate,
            PressISActive,
            IsActive,
            Author,
            CreatedBy,
            PressLink,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

      return  updatedPressBlog
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedPressBlogs });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateImage = async (req, res) => {
  try {
    const { filename } = req.file;

    const updatedPressBlog = await prisma.tblPress.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        PressImage: filename,
      },
    });

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedPressBlog });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {

    
    const ids = req.query.id.split(",").map((id) => Number(id));

    const DeletePressPressBlogs = await Promise.all(
      ids.map(async (id) => {
        const deletedPress = await prisma.tblPress.delete({
          where: {
            id: id,
          },
        });

      return  deletedPress
      })
    );

  
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: DeletePressPressBlogs });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateImage,
};
