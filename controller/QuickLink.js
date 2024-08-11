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
    const { Id, QuickLinkIsActive } = req.query;
    let tblQuickLink;

    const whereClause = {};

    if (Id) {
      whereClause.Id = parseInt(Id);
    }

    if (QuickLinkIsActive) {
      whereClause.QuickLinkIsActive =
        QuickLinkIsActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblQuickLink = await prisma.tblQuickLink.findMany({
        where: whereClause,
        orderBy: {
          Id: "desc",
        },
      });
    } else {
      tblQuickLink = await prisma.tblQuickLink.findMany({
        orderBy: {
          Id: "desc",
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

    res.send({ Status: true, Message: "Success", result: tblQuickLink });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

// createProduct = async (req, res) => {
//   try {
//     const { Title, PermaLink, Author, BrowserRoutersId } = req.body;

//     const newQuickLink = await prisma.tblQuickLink.create({
//       data: {
//         Title,

//         QuickLinkIsActive: true,
//         PermaLink,
//         Date: new Date(),
//         Author,
//         BrowserRoutersId,
//       },
//     });
// console.log('newQuickLink',newQuickLink)
//     const newBlog = await prisma.tblBrowserRouters.create({
//       data: {
//         BrowserRouterTitle: newQuickLink.Title,
//         BrowserRouterDescription: "Quick Link",
//         BrowserRouterPermaLink: newQuickLink.PermaLink,
//         BrowserRouterFuction: newQuickLink.Title,
//         BrowserRoutersisActive: true,
//         CreatedBy,
//         CreatedDate: new Date(),
//         ModifiedBy,
//         ModifiedDate,
//       },
//     });

//     if (newBlog.BrowserRoutersId != null) {
//       var updatedMenus = await prisma.tblQuickLink.update({
//         where: {
//           Id: newQuickLink.Id,
//         },
//         data: {
//           BrowserRoutersId: newBlog.BrowserRoutersId,
//         },
//       });
//     }
//     res.status(201).json({
//       Status: true,
//       Message: "Create Success",
//       result: updatedMenus,
//     });
//   } catch (error) {
//     res.status(400).json({ Status: false, Message: "Internal Server Error" });
//   }
// };

createProduct = async (req, res) => {
  try {
    const {
      Title,
      PermaLink,
      Author,
      BrowserRoutersId,
      CreatedBy,
      ModifiedBy,
    } = req.body;

    // Create a new Quick Link
    const newQuickLink = await prisma.tblQuickLink.create({
      data: {
        Title,
        QuickLinkIsActive: true,
        PermaLink,
        Date: new Date(),
        Author,
        BrowserRoutersId,
      },
    });
    console.log("newQuickLink", newQuickLink);

    // Create a new Blog (BrowserRouter)
    const newBlog = await prisma.tblBrowserRouters.create({
      data: {
        BrowserRouterTitle: newQuickLink.Title,
        BrowserRouterDescription: "Quick Link",
        BrowserRouterPermaLink: newQuickLink.PermaLink,
        BrowserRouterFuction: newQuickLink.Title,
        BrowserRoutersisActive: true,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate: new Date(),
      },
    });

    // Update the QuickLink with the newly created Blog's BrowserRoutersId
    let updatedMenus = null;
    if (newBlog.BrowserRoutersId != null) {
      updatedMenus = await prisma.tblQuickLink.update({
        where: {
          Id: newQuickLink.Id,
        },
        data: {
          BrowserRoutersId: newBlog.BrowserRoutersId,
        },
      });
    }

    res.status(201).json({
      Status: true,
      Message: "Create Success",
      result: updatedMenus,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      Title,

      QuickLinkIsActive,
      PermaLink,
      BrowserRoutersId,
      Author,
    } = req.body;

    var updatedMenu;
    const menuIds = req.query.Id.split(",").map((Id) => Number(Id));

    const updatedMenus = await Promise.all(
      menuIds.map(async (Id, index) => {
        updatedMenu = await prisma.tblQuickLink.update({
          where: {
            Id: Id,
          },
          data: {
            Title,

            QuickLinkIsActive,
            PermaLink,
            Date: new Date(),
            Author,
            BrowserRoutersId,
          },
        });

        return updatedMenu;
      })
    );

    if (updatedMenu.BrowserRoutersId != null) {
      await prisma.tblBrowserRouters.update({
        where: {
          BrowserRoutersId: updatedMenu.BrowserRoutersId,
        },
        data: {
          BrowserRouterTitle: updatedMenu.Title,
          BrowserRouterDescription: "Ouick Link",
          BrowserRouterPermaLink: updatedMenu.PermaLink,
          BrowserRouterFuction: updatedMenu.Title,
          BrowserRoutersisActive: true,

          ModifiedDate: new Date(),
        },
      });
    }

    if (updatedMenu.QuickLinkIsActive != true) {
      await prisma.tblBrowserRouters.update({
        where: {
          BrowserRoutersId: updatedMenu.BrowserRoutersId,
        },
        data: {
          BrowserRoutersisActive: false,

          ModifiedDate: new Date(),
        },
      });
    }
    if (updatedMenu.QuickLinkIsActive == true) {
      await prisma.tblBrowserRouters.update({
        where: {
          BrowserRoutersId: updatedMenu.BrowserRoutersId,
        },
        data: {
          BrowserRoutersisActive: true,

          ModifiedDate: new Date(),
        },
      });
    }

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedMenus });
  } catch (error) {
    console.log("Error updating product:", error);
    res.status(500).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const Ids = req.query.Id.split(",").map((id) => Number(id));

    const DeleteLogo = await Promise.all(
      Ids.map(async (id) => {
        const DeleteQuickLink = await prisma.tblQuickLink.delete({
          where: {
            Id: id,
          },
        });

        return DeleteQuickLink;
      })
    );

    if (DeleteLogo.BrowserRoutersId != null) {
      await prisma.tblBrowserRouters.update({
        where: {
          BrowserRoutersId: DeleteLogo.BrowserRoutersId,
        },
        data: {
          BrowserRoutersisActive: false,

          ModifiedDate: new Date(),
        },
      });
    }
    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: DeleteLogo,
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
