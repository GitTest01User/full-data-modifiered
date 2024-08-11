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
    const { BlogPermalink, BlogId, BlogCategories, BlogISActive } = req.query;

    let tblBlogs;
    const whereClause = {};

    if (BlogId) {
      whereClause.BlogId = parseInt(BlogId);
    }
    if (BlogCategories) {
      whereClause.BlogCategories = parseInt(BlogCategories);
    }

    if (BlogPermalink) {
      whereClause.BlogPermalink = BlogPermalink;
    }

    if (BlogISActive) {
      whereClause.BlogISActive = BlogISActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblBlogs = await prisma.tblBlogs.findMany({
        where: whereClause,
        orderBy: {
          BlogId: "desc",
        },
        include: {
          tblBrowserRouters: {
            select: {
              BrowserRouterPermaLink: true,
            },
          },
        },
      });
    } else {
      tblBlogs = await prisma.tblBlogs.findMany({
        orderBy: {
          BlogId: "desc",
        },
        include: {
          tblBrowserRouters: {
            select: {
              BrowserRouterPermaLink: true,
            },
          },
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblBlogs });
  } catch (error) {
   
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      BlogTitle,
      BlogAuthor,
      BlogImage,
      Author,
      BlogDescription,
      BlogDate,
      BlogContents,
      BlogPermalink,
      BlogCategories,
      IsActive,
      CreatedBy,
      ModifiedBy,
      ModifiedDate,
      BrowserRoutersId,
    } = req.body;

    const existingLink = await prisma.tblBlogs.findFirst({
      where: {
        BlogPermalink,
      },
    });
    if (existingLink) {
      return res.status(201).json({
        Status: false,
        Message: "Required Blogs information Record already exists!",
      });
    }

    if (
      !BlogTitle ||
      !BlogPermalink ||
      !BlogCategories ||
      !BlogDescription ||
      !BlogContents
    ) {
      return res.status(201).json({
        Status: false,
        Message: "Required Blogs information is missing!",
      });
    }

    if (BlogImage != null) {
      var ImageNameNew;
      const base64String = BlogImage;
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

    const newBlog = await prisma.tblBlogs.create({
      data: {
        Author,
        BlogTitle,
        BlogAuthor,
        BlogImage: ImageNameNew,
        BlogFeaturedImageAlt: "Digi2l",
        BlogDescription,
        BlogDate,
        BlogContents,
        BlogPermalink,
        BlogCategories,
        BlogISActive: true,
        IsActive,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
        BrowserRoutersId,
      },
    });

    res.status(201).json({
      Status: true,
      Message: " you can display a blogs and message. ",
      result: newBlog,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      Author,
      BlogTitle,
      BlogAuthor,
      BlogImage,
      BlogISActive,
      BlogDescription,
      BlogDate,
      BlogContents,
      BlogPermalink,
      BlogCategories,
      IsActive,
      CreatedBy,
      ModifiedBy,
      ModifiedDate,
      BrowserRoutersId,
    } = req.body;

    if (BlogImage != null) {
      var ImageNameNew;
      const base64String = BlogImage;
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
    const BlogIds = req.query.BlogId.split(",").map((id) => Number(id));

    const updatedBlogs = await Promise.all(
      BlogIds.map(async (id) => {
        const updatedBlog = await prisma.tblBlogs.update({
          where: {
            BlogId: id,
          },
          data: {
            Author,
            BlogTitle,
            BlogAuthor,
            BlogImage: ImageNameNew,
            BlogFeaturedImageAlt: "Digi2l",
            BlogDescription,
            BlogDate,
            BlogContents,
            BlogPermalink,
            BlogCategories,
            BlogISActive,
            IsActive,
            CreatedBy,
            CreatedDate: new Date(),
            ModifiedBy,
            ModifiedDate,
            BrowserRoutersId,
          },
        });
        return updatedBlog;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedBlogs });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const BlogIds = req.query.BlogId.split(",").map((id) => Number(id));
    const updatedBlogs = await Promise.all(
      BlogIds.map(async (id) => {
        const deletedBlog = await prisma.tblBlogs.delete({
          where: {
            BlogId: id,
          },
        });

        return deletedBlog;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: updatedBlogs });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

FileImageCreate = async (req, res) => {
  try {
    const { filename } = req.file;

    const updatedBlog = await prisma.tblBlogs.create({
      data: {
        BlogImage: filename,
      },
    });

    res
      .status(200)
      .json({ Status: true, Message: "Create Success", result: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

FileImageUpdate = async (req, res) => {
  try {
    const { filename } = req.file;

    const updatedBlog = await prisma.tblBlogs.update({
      where: {
        BlogId: Number(req.query.BlogId),
      },
      data: {
        BlogImage: filename,
      },
    });

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

FileUpload = async (req, res) => {
  if (req.file) {
    res.send("Single file uploaded successfully");
  } else {
    res.status(400).send("Please upload a valid image");
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  FileImageCreate,
  FileImageUpdate,
  FileUpload,
};
