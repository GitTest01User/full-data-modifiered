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
    const { Id, CounterISActive } = req.query;

    let tblResellerCounter;

    const whereClause = {};

    if (Id) {
      whereClause.Id = parseInt(Id);
    }

    if (CounterISActive) {
      whereClause.CounterISActive = CounterISActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblResellerCounter = await prisma.tblResellerCounter.findMany({
        where: whereClause,
      });
    } else {
      tblResellerCounter = await prisma.tblResellerCounter.findMany({
        orderBy: {
          Id: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblResellerCounter });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ Status: false, Message: "Internal Server Error", error: error });
  }
};

createProduct = async (req, res) => {
  try {
    const { Author, Reseller_count, BackendIcon, ImageCounter } = req.body;

    // if (ImageCounter != null) {
    //   var ImageNameNew;
    //   const base64String = ImageCounter;
    //   if (base64String.startsWith("data:image/svg+xml;base64,")) {
    //     const base64Data = base64String.replace(
    //       "data:image/svg+xml;base64,",
    //       ""
    //     );
    //     const buffer = Buffer.from(base64Data, "base64");
    //     const imagePath = `./public/Images/${Date.now()}_image.svg`;
    //     fs.writeFileSync(imagePath, buffer);
    //     ImageNameNew = imagePath.replace("./public/Images/", "");
    //     console.log("SVG Image saved successfully!", ImageNameNew);
    //   } else if (base64String.startsWith("data:image/")) {
    //     const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    //     const buffer = Buffer.from(base64Data, "base64");
    //     const imagePath = `./public/Images/${Date.now()}_image.png`;
    //     fs.writeFileSync(imagePath, buffer);
    //     ImageNameNew = imagePath.replace("./public/Images/", "");
    //     console.log("PNG/JPEG Image saved successfully!", ImageNameNew);
    //   } else {
    //     console.log("Unsupported image format.");
    //   }
    // }

    const newResellerCounter = await prisma.tblResellerCounter.create({
      data: {
        Title,
        ImageCounter,
        Reseller_count,
        CounterDate: new Date(),
        Author,
        CounterISActive: true,
        BackendIcon,
      },
    });
    res
      .status(201)
      .json({
        Status: true,
        Message: "Create Success",
        result: newResellerCounter,
      });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      Title,
      CounterISActive,
      Author,
      Reseller_count,
      BackendIcon,
      ImageCounter,
    } = req.body;
    // if (ImageCounter != null) {
    //   var ImageNameNew;
    //   const base64String = ImageCounter;
    //   if (base64String.startsWith("data:image/svg+xml;base64,")) {
    //     const base64Data = base64String.replace(
    //       "data:image/svg+xml;base64,",
    //       ""
    //     );
    //     const buffer = Buffer.from(base64Data, "base64");
    //     const imagePath = `./public/Images/${Date.now()}_image.svg`;
    //     fs.writeFileSync(imagePath, buffer);
    //     ImageNameNew = imagePath.replace("./public/Images/", "");
    //     console.log("SVG Image saved successfully!", ImageNameNew);
    //   } else if (base64String.startsWith("data:image/")) {
    //     const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
    //     const buffer = Buffer.from(base64Data, "base64");
    //     const imagePath = `./public/Images/${Date.now()}_image.png`;
    //     fs.writeFileSync(imagePath, buffer);
    //     ImageNameNew = imagePath.replace("./public/Images/", "");
    //     console.log("PNG/JPEG Image saved successfully!", ImageNameNew);
    //   } else {
    //     console.log("Unsupported image format.");
    //   }
    // }
    const Ids = req.query.Id.split(",").map((Id) => Number(Id));

    const updatedResellerCounters = await Promise.all(
      Ids.map(async (Id) => {
        const updatedResellerCounter = await prisma.tblResellerCounter.update({
          where: {
            Id: Id,
          },
          data: {
            Title,
            CounterISActive,
            Author,
            BackendIcon,
            Reseller_count,
            ImageCounter,
            CounterDate: new Date(),
          },
        });

        return updatedResellerCounter;
      })
    );

    res
      .status(200)
      .json({
        Status: true,
        Message: "Update Success",
        result: updatedResellerCounters,
      });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const Ids = req.query.Id.split(",").map((Id) => Number(Id));

    const DeleteCounterResellerCounters = await Promise.all(
      Ids.map(async (Id) => {
        const deletedCounter = await prisma.tblResellerCounter.delete({
          where: {
            Id: Id,
          },
        });

        return deletedCounter;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: DeleteCounterResellerCounters,
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
