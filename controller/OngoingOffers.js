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

const fs = require("fs");

getProducts = async (req, res) => {
  try {
    const { OngoingOffersId, OngoingOffersisActive } = req.query;

    let tblOngoingOffers;
    const whereClause = {};

    if (OngoingOffersId) {
      whereClause.OngoingOffersId = parseInt(OngoingOffersId);
    }

    if (OngoingOffersisActive) {
      whereClause.OngoingOffersisActive =
        OngoingOffersisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblOngoingOffers = await prisma.tblOngoingOffers.findMany({
        where: whereClause,
        orderBy: {
          OngoingOffersId: "desc",
        },
        
      });
    } else {
      tblOngoingOffers = await prisma.tblOngoingOffers.findMany({
        orderBy: {
          OngoingOffersId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblOngoingOffers });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      OngoingOffersTitle,
      OngoingOffersImage,
      OngoingOffersLink,
      Author,
      IsActive,
      CreatedBy,

      ModifiedBy,
      ModifiedDate,
    } = req.body;

    if (OngoingOffersImage != null) {
      var ImageNameNew;
      const base64String = OngoingOffersImage;
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

    const newOngoingOffers = await prisma.tblOngoingOffers.create({
      data: {
        OngoingOffersTitle,
        OngoingOffersImage: ImageNameNew,
        OngoingOffersLink,
        OngoingOffersisActive: true,
        IsActive,
        Author,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newOngoingOffers });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      OngoingOffersTitle,
      OngoingOffersImage,
      OngoingOffersLink,
      OngoingOffersisActive,
      IsActive,
      Author,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
    } = req.body;


    if (OngoingOffersImage != null) {
      var ImageNameNew;
      const base64String = OngoingOffersImage;
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
    const OfferSilderIds = req.query.OngoingOffersId.split(",").map((id) =>
      Number(id)
    );

    const updatedOfferSliders = await Promise.all(
      OfferSilderIds.map(async (id) => {
        const updatedOffer = await prisma.tblOngoingOffers.update({
          where: {
            OngoingOffersId: id,
          },
          data: {
            OngoingOffersTitle,
            OngoingOffersImage: ImageNameNew,
            OngoingOffersLink,
            OngoingOffersisActive,
            IsActive,
            Author,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

        return updatedOffer;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Update Success",
      result: updatedOfferSliders,
    });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const OngoingOffersIds = req.query.OngoingOffersId.split(",").map((id) =>
      Number(id)
    );

    const DeletOfferSliders = await Promise.all(
      OngoingOffersIds.map(async (id) => {
        const DeleteOfferSlider = await prisma.tblOngoingOffers.delete({
          where: {
            OngoingOffersId: id,
          },
        });

        return DeleteOfferSlider;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: DeletOfferSliders,
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
