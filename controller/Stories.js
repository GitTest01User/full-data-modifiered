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
    const { StoriesId, StoriesPermalink, StoriesisActive } = req.query;
    let tblStories;

    const whereClause = {};

    if (StoriesId) {
      whereClause.StoriesId = parseInt(StoriesId);
    }
    if (StoriesPermalink) {
      whereClause.StoriesPermalink = StoriesPermalink;
    }

    if (StoriesisActive) {
      whereClause.StoriesisActive = StoriesisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblStories = await prisma.tblStories.findMany({
        where: whereClause,
        orderBy: {
          StoriesId: "desc",
        },
      });
    } else {
      tblStories = await prisma.tblStories.findMany({
        orderBy: {
          StoriesId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblStories });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};
createProduct = async (req, res) => {
  try {
    const {
      StoriesTitle,
      StoriesImage,
      StoriesProgram,
      StoriesSuccessImage,
      StoriesContent,
      StoriesSponsorName,
      StoriesProgramName,
      StoriesAgreementDate,
      StoriesLaunchDate,
      StoriesPinCodes,
      StoriesCityCoverage,
      StoriesPermalink,
      Author,
      IsActive,
      CreatedBy,
      BrowserRoutersId,
      ModifiedBy,
      ModifiedDate,
    } = req.body;

    if (StoriesImage != null) {
      var ImageNameNew;
      const base64String = StoriesImage;
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
    if (StoriesSuccessImage != null) {
      var ImageNameNews;
      const base64String = StoriesSuccessImage;
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

    const updatedStories = await prisma.tblStories.create({
      data: {
        StoriesTitle,
        StoriesImage: ImageNameNew,
        StoriesFeaturedImageAlt: "Digi2l-Alt",
        StoriesLogo: ImageNameNew,
        StoriesProgram,
        StoriesSuccessImage: ImageNameNews ? ImageNameNews : 'Success.png',
        StoriesContent,
        StoriesSponsorName,
        StoriesProgramName,
        StoriesAgreementDate,
        StoriesLaunchDate,
        StoriesPinCodes,
        StoriesCityCoverage,
        StoriesPermalink,
        StoriesisActive: true,
        IsActive,
        Author,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
        BrowserRoutersId
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Create Success", result: updatedStories });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      StoriesTitle,
      StoriesImage,
      Author,
      BrowserRoutersId,
      StoriesProgram,
      StoriesSuccessImage,
      StoriesContent,
      StoriesSponsorName,
      StoriesProgramName,
      StoriesAgreementDate,
      StoriesLaunchDate,
      StoriesPinCodes,
      StoriesCityCoverage,
      StoriesPermalink,
      StoriesisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
    } = req.body;
    if (StoriesImage != null) {
      var ImageNameNew;
      const base64String = StoriesImage;
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
    if (StoriesSuccessImage != null) {
      var ImageNameNews;
      const base64String = StoriesSuccessImage;
      if (base64String.startsWith("data:image/svg+xml;base64,")) {
        const base64Data = base64String.replace(
          "data:image/svg+xml;base64,",
          ""
        );
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.svg`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNews = imagePath.replace("./public/Images/", "");
        console.log("SVG Image saved successfully!", ImageNameNews);
      } else if (base64String.startsWith("data:image/")) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.png`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNews = imagePath.replace("./public/Images/", "");
        console.log("PNG/JPEG Image saved successfully!", ImageNameNews);
      } else {
        console.log("Unsupported image format.");
      }
    }

    const StoriesIds = req.query.StoriesId.split(",").map((id) => Number(id));

    const updatedStoriesAll = await Promise.all(
      StoriesIds.map(async (id) => {
        const updatedStories = await prisma.tblStories.update({
          where: {
            StoriesId: id,
          },
          data: {
            BrowserRoutersId,
            StoriesTitle,
            StoriesImage: ImageNameNew,
            StoriesFeaturedImageAlt: "Digi2l-Alt",
            StoriesLogo: ImageNameNew,
            StoriesProgram,
            StoriesSuccessImage: ImageNameNews ?ImageNameNews:'Success.png',
            StoriesContent,
            Author,
            StoriesSponsorName,
            StoriesProgramName,
            StoriesAgreementDate,
            StoriesLaunchDate,
            StoriesPinCodes,
            StoriesCityCoverage,
            StoriesPermalink,
            StoriesisActive,
            IsActive,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

        return updatedStories;
      })
    );

    res
      .status(200)
      .json({
        Status: true,
        Message: "Update Success",
        result: updatedStoriesAll,
      });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const StoriesIds = req.query.StoriesId.split(",").map((id) => Number(id));
    var updatedStoriesAll = await Promise.all(
      StoriesIds.map(async (id) => {
        const deletedStoires = await prisma.tblStories.delete({
          where: {
            StoriesId: id,
          },
        });
        return deletedStoires;
      })
    );

    res
      .status(200)
      .json({
        Status: true,
        Message: "Delete Success",
        result: updatedStoriesAll,
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
