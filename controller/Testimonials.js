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
    const { Testimonialid, TestimanialisActive, RoleTestimanial } = req.query;

    let tblTestimonial;

    const whereClause = {};

    if (Testimonialid) {
      whereClause.Testimonialid = parseInt(Testimonialid);
    }
    if (RoleTestimanial) {
      whereClause.RoleTestimanial = RoleTestimanial;
    }

    if (TestimanialisActive) {
      whereClause.TestimanialisActive =
        TestimanialisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblTestimonial = await prisma.tblTestimonial.findMany({
        where: whereClause,
        orderBy: {
          Testimonialid: "desc",
        },
      });
    } else {
      tblTestimonial = await prisma.tblTestimonial.findMany({
        orderBy: {
          Testimonialid: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblTestimonial });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      CompanyName,
      RoleTestimanial,
      Author,
      TestimonialName,
      TestimonialAddress,
      TestimonialImage,
      TestimonialDescription,
      TestimanialisActive,
      IsActive,
      CreatedBy,
      ModifiedBy,
      ModifiedDate,
    } = req.body;
    if (TestimonialImage != null) {
      var ImageNameNew;
      const base64String = TestimonialImage;
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

    const newTestimonials = await prisma.tblTestimonial.create({
      data: {
        CompanyName,
        RoleTestimanial,
        Author,
        TestimonialName,
        TestimonialAddress,
        TestimonialImage: ImageNameNew,
        TestimonialFeaturedImageAlt: "Digi2l",
        TestimonialDescription,
        TestimanialisActive,
        IsActive,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });
    res
      .status(201)
      .json({
        Status: true,
        Message: "Create Success",
        result: newTestimonials,
      });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      CompanyName,
      RoleTestimanial,
      TestimonialName,
      TestimonialAddress,
      TestimonialImage,
      Author,
      TestimonialDescription,
      TestimanialisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy ,
    } = req.body;
    if (TestimonialImage != null) {
      var ImageNameNew;
      const base64String = TestimonialImage;
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
    const Testimonialids = req.query.Testimonialid.split(",").map((id) =>
      Number(id)
    );

    var updatedTestimonial = await Promise.all(
      Testimonialids.map(async (id) => {
        const updatedTestmonial = await prisma.tblTestimonial.update({
          where: {
            Testimonialid: id,
          },
          data: {
            CompanyName,
            RoleTestimanial,
            Author,
            TestimonialName,
            TestimonialAddress,
            TestimonialImage: ImageNameNew,
            TestimonialFeaturedImageAlt: "Digi2l",
            TestimonialDescription,
            TestimanialisActive,
            IsActive,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });
        return updatedTestmonial;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Update Success",
      result: updatedTestimonial,
    });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

createProductImage = async (req, res) => {
  try {
    const { filename } = req.file;

    const updatedTestimonials = await prisma.tblTestimonial.create({
      data: {
        TestimonialImage: filename,
        TestimonialFeaturedImageAlt: "Digi2l",
        TestimanialisActive: true,
        CreatedDate: new Date(),
      },
    });

    res
      .status(200)
      .json({
        Status: true,
        Message: "Create Success",
        result: updatedTestimonials,
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const Testimonialids = req.query.Testimonialid.split(",").map((id) =>
      Number(id)
    );

    var updatedTestimonialss = await Promise.all(
      Testimonialids.map(async (id) => {
        const deletedTestimonial = await prisma.tblTestimonial.delete({
          where: {
            Testimonialid: id,
          },
        });
        return deletedTestimonial;
      })
    );

    res
      .status(200)
      .json({
        Status: true,
        Message: "Delete Success",
        result: updatedTestimonialss,
      });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateImage = async (req, res) => {
  try {
    const { filename } = req.file;

    const updatedTestimonials = await prisma.tblTestimonial.update({
      where: {
        Testimonialid: Number(req.query.Testimonialid),
      },
      data: {
        TestimonialImage: filename,

        TestimonialFeaturedImageAlt: "Digi2l",
        TestimanialisActive: true,
        ModifiedDate: new Date(),
      },
    });

    res
      .status(200)
      .json({
        Status: true,
        Message: "Update Success",
        result: updatedTestimonials,
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};
module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  updateImage,
  deleteProduct,
  createProductImage,
};
