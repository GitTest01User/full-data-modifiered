const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
getProducts = async (req, res) => {
  try {
    const { Id, Title, Link, FollowIsActive } = req.query;

    let tblFollow;
    const whereClause = {};

    if (Id) {
      whereClause.Id = parseInt(Id);
    }
    if (Title) {
      whereClause.Title = parseInt(Title);
    }

    if (Link) {
      whereClause.Link = Link;
    }

    if (FollowIsActive) {
      whereClause.FollowIsActive = FollowIsActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblFollow = await prisma.tblFollow.findMany({
        where: whereClause,
        orderBy: {
          Id: "desc",
        },
      });
    } else {
      tblFollow = await prisma.tblFollow.findMany({
        orderBy: {
          Id: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblFollow });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const { Title, Link, Image, FollowIsActive, Author } = req.body;

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

    const newFollow = await prisma.tblFollow.create({
      data: {
        Title,
        Link,
        Image: ImageNameNew,
        FollowIsActive,
        Author,
      },
    });

    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newFollow });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const { Title, Link, Image, FollowIsActive, Author } = req.body;

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

    const IconsIds = req.query.Id.split(",").map((Id) => Number(Id));

    const updatedIcons = await Promise.all(
      IconsIds.map(async (id, index) => {
        const updatedIcons = await prisma.tblFollow.update({
          where: {
            Id: id,
          },
          data: {
            Title,
            Link,
            Image: ImageNameNew,
            FollowIsActive,
            Author,
          },
        });

        return updatedIcons;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedIcons });
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const IconsIds = req.query.Id.split(",").map((Id) => Number(Id));

    const DeleteIcons = await Promise.all(
      IconsIds.map(async (id, index) => {
        const DeleteIcons = await prisma.tblFollow.delete({
          where: {
            Id: id,
          },
        });

        return DeleteIcons;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: DeleteIcons });
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
