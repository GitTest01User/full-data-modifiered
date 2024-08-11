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

    let tblHeader_Follow;
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
      tblHeader_Follow = await prisma.tblHeader_Follow.findMany({
        where: whereClause,
        orderBy: {
          Id: "desc",
        },
      });
    } else {
      tblHeader_Follow = await prisma.tblHeader_Follow.findMany({
        orderBy: {
          Id: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblHeader_Follow });
  } catch (error) {
   
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const { Title, Link, FollowIsActive, Author, Icon } = req.body;

    const newFollowIcon = await prisma.tblHeader_Follow.create({
      data: {
        Title,
        Link,
        FollowIsActive,
        Author,
        Icon,
      },
    });

    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newFollowIcon });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const { Title, Link, FollowIsActive, Author, Icon } = req.body;

    const IconsIds = req.query.Id.split(",").map((Id) => Number(Id));

    const updatedIcons = await Promise.all(
      IconsIds.map(async (id, index) => {
        const updatedIcons = await prisma.tblHeader_Follow.update({
          where: {
            Id: id,
          },
          data: {
            Title,
            Link,
            FollowIsActive,
            Author,
            Icon,
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
        const DeleteIcons = await prisma.tblHeader_Follow.delete({
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
