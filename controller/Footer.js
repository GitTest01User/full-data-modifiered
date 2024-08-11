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
    const { FooterId, FooterPerantId, FooterPermaLinks, FooterisActive } =
      req.query;

    let tblFooter;
    const whereClause = {};

    if (FooterId) {
      whereClause.FooterId = parseInt(FooterId);
    }
    if (FooterPerantId) {
      whereClause.FooterPerantId = parseInt(FooterPerantId);
    }

    if (FooterPermaLinks) {
      whereClause.FooterPermaLinks = FooterPermaLinks;
    }

    if (FooterisActive) {
      whereClause.FooterisActive = FooterisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblFooter = await prisma.tblFooter.findMany({
        where: whereClause,
       
        include: {
          tblBrowserRouters: {
            select: {
              BrowserRouterPermaLink: true,
            },
          },
        },
      });
    } else {
      tblFooter = await prisma.tblFooter.findMany({
        orderBy: {
          serialNo: "asc",
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

    res.send({ Status: true, Message: "Success", result: tblFooter });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

// createProduct = async (req, res) => {
//   try {
//     const {} = req.body;

//     var newStr;
//     if (FooterTitle != null) {
//       newStr = FooterTitle.trim()
//         .split(/[\s,\t,\n]+/)
//         .join("_");

//       console.log(newStr);
//     }

//     const newFooter = await prisma.tblFooter.create({
//       data: {
//         FooterTitle,
//         FooterPermaLinks,
//         FooterPerantId,
//         isMenu,
//         FooterisActive,
//         IsActive,
//         CreatedBy,
//         CreatedDate,
//         ModifiedBy,
//         ModifiedDate,
//         serialNo,
//         Author,
//         FooterKey: newStr ? newStr : FooterKey,
//       },
//     });
//     if (newFooter.FooterPermaLinks != null) {
//       const newBlog = await prisma.tblBrowserRouters.create({
//         data: {
//           BrowserRouterTitle: newFooter.FooterTitle,
//           BrowserRouterDescription: newStr,
//           BrowserRouterPermaLink: newFooter.FooterPermaLinks,
//           BrowserRouterFuction: newFooter.FooterTitle,
//           BrowserRoutersisActive: true,
//           CreatedBy,
//           CreatedDate: new Date(),
//           ModifiedBy,
//           ModifiedDate,
//         },
//       });
//       if (newBlog.BrowserRoutersId != null) {
//         await prisma.tblFooter.update({
//           where: {
//             FooterId: newMenuFront.FooterId,
//           },
//           data: {
//             BrowserRoutersId: newBlog.BrowserRoutersId,
//           },
//         });
//       }
//     }

//     res
//       .status(201)
//       .json({ Status: true, Message: "Create Success", result: newFooter });
//   } catch (error) {
//     res.status(400).json({ Status: false, Message: "Internal Server Error" });
//   }
// };

createProduct = async (req, res) => {
  try {
    const {
      FooterTitle,
      FooterPermaLinks,
      FooterPerantId,
      isMenu,
      FooterisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
      // serialNo,
      Author,
      FooterKey,
    } = req.body;

    var newStr;
    if (FooterTitle != null) {
      newStr = FooterTitle.trim()
        .split(/[\s,\t,\n]+/)
        .join("_");

      console.log(newStr);
    }

    var newMenuFront = await prisma.tblFooter.create({
      data: {
        FooterTitle,
        FooterPermaLinks,
        FooterPerantId,
        isMenu,
        FooterisActive: true,
        IsActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
        // serialNo,
        Author,
        FooterKey: newStr,
      },
    });

    const newBlog = await prisma.tblBrowserRouters.create({
      data: {
        BrowserRouterTitle: newMenuFront.FooterTitle,
        BrowserRouterDescription: newStr,
        BrowserRouterPermaLink: newMenuFront.FooterPermaLinks,
        BrowserRouterFuction: newMenuFront.FooterTitle,
        BrowserRoutersisActive: true,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });

    if (newBlog.BrowserRoutersId != null) {
      var updatedMenus = await prisma.tblFooter.update({
        where: {
          FooterId: newMenuFront.FooterId,
        },
        data: {
          BrowserRoutersId: newBlog.BrowserRoutersId,
        },
      });
    }

    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: updatedMenus });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};


updateProduct = async (req, res) => {
  try {
    const {
      FooterTitle,
      FooterPermaLinks,
      FooterPerantId,
      isMenu,
      FooterisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
      serialNo,
      Author,
    } = req.body;

    if (!req.query.FooterId) {
      return res
        .status(400)
        .json({ Status: false, Message: "FooterId parameter is missing" });
    }

    const FooterIds = req.query.FooterId.split(",").map(Number);

    const updatedFooters = await Promise.all(
      FooterIds.map(async (id, index) => {
        return await prisma.tblFooter.update({
          where: { FooterId: id },
          data: {
            FooterTitle,
            FooterPermaLinks,
            FooterPerantId,
            isMenu,
            FooterisActive,
            Author,
            serialNo,
            IsActive,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate,
            isMenu: FooterPerantId == null ? true : false,
          },
        });
      })
    );

    for (const updatedFooter of updatedFooters) {
      const browserRouterData = {
        BrowserRouterTitle: updatedFooter.FooterTitle,
        BrowserRouterDescription: "Footer",
        BrowserRouterPermaLink: updatedFooter.FooterPermaLinks,
        BrowserRouterFuction: updatedFooter.FooterTitle,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate: new Date(),
      };

      if (updatedFooter.BrowserRoutersId != null) {
        await prisma.tblBrowserRouters.update({
          where: { BrowserRoutersId: updatedFooter.BrowserRoutersId },
          data: {
            ...browserRouterData,
            BrowserRoutersisActive: updatedFooter.FooterisActive,
          },
        });
      }
    }

    await prisma.tblFooter.updateMany({
      where: {
        FooterPerantId: { not: null },
      },
      data: { isMenu: false },
    });

    const footersToUpdate = await prisma.tblFooter.findMany({
      where: {
        FooterPerantId: null,
        isMenu: false,
      },
    });


   

    await Promise.all(
      footersToUpdate.map(async (footer) => {
        return await prisma.tblFooter.update({
          where: { FooterId: footer.FooterId },
          data: { isMenu: true },
        });
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Update Success",
      result: updatedFooters,
    });
  } catch (error) {
    console.error("Error updating footer:", error);
    res.status(500).json({ Status: false, Message: "Internal Server Error" });
  }
};



deleteProduct = async (req, res) => {
  try {
    const menuIds = req.query.FooterId.split(",").map((Id) => Number(Id));

    const DeleteMenus = await Promise.all(
      menuIds.map(async (id, index) => {
        const DeleteMenu = await prisma.tblFooter.delete({
          where: {
            FooterId: id,
          },
        });

        return DeleteMenu;
      })
    );
    if (DeleteMenus.BrowserRoutersId != null) {
      await prisma.tblBrowserRouters.update({
        where: {
          BrowserRoutersId: DeleteMenus.BrowserRoutersId,
        },
        data: {
          BrowserRoutersisActive: false,

          ModifiedDate: new Date(),
        },
      });
    }
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: DeleteMenus });
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
