const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const multer = require("multer");
const sharp = require("sharp");
var createProductBrowser = require("../controller/BrowserRoute");
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
    const { id, HeaderPerantId, HeaderPermaLink, HeaderisActive } = req.query;

    let tblHeader;
    const whereClause = {};

    if (id) {
      whereClause.id = parseInt(id);
    }

    if (HeaderPerantId) {
      whereClause.HeaderPerantId = parseInt(HeaderPerantId);
    }

    if (HeaderPermaLink) {
      whereClause.HeaderPermaLink = HeaderPermaLink;
    }

    if (HeaderisActive) {
      whereClause.HeaderisActive = HeaderisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblHeader = await prisma.tblHeader.findMany({
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
      tblHeader = await prisma.tblHeader.findMany({
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

    res.send({ Status: true, Message: "Success", result: tblHeader });
  } catch (error) {
    console.error(error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      HeaderTitle,
      HeaderPermaLink,
      HeaderPerantId,
      HeaderIconPath,
      HeaderIcon,
      isMenu,
      MenuKey,
      HeaderisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
      BrowserRoutersId,
      flagSubMenu,
      Author,
      HeaderMoblieIcon,
    } = req.body;
    var newStr;
    if (HeaderTitle != null) {
      newStr = HeaderTitle.trim()
        .split(/[\s,\t,\n]+/)
        .join("_");

      console.log(newStr);
    }
    if (HeaderIcon != null) {
      var ImageNameNew;
      const base64String = HeaderIcon;
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

    if (HeaderMoblieIcon != null) {
      var ImageNameNewIcon;
      const base64String = HeaderMoblieIcon;
      if (base64String.startsWith("data:image/svg+xml;base64,")) {
        const base64Data = base64String.replace(
          "data:image/svg+xml;base64,",
          ""
        );
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.svg`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNewIcon = imagePath.replace("./public/Images/", "");
        console.log("SVG Image saved successfully!", ImageNameNewIcon);
      } else if (base64String.startsWith("data:image/")) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.png`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNewIcon = imagePath.replace("./public/Images/", "");
        console.log("PNG/JPEG Image saved successfully!", ImageNameNewIcon);
      } else {
        console.log("Unsupported image format.");
      }
    }

    var newMenuFront = await prisma.tblHeader.create({
      data: {
        HeaderTitle,
        HeaderPermaLink,
        HeaderPerantId,
        HeaderIconPath,
        HeaderIcon: ImageNameNew,
        isMenu,
        MenuKey: newStr,
        HeaderisActive,
        IsActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
        BrowserRoutersId,
        flagSubMenu,
        Author,
        HeaderMoblieIcon: ImageNameNewIcon,
      },
    });

    const newBlog = await prisma.tblBrowserRouters.create({
      data: {
        BrowserRouterTitle: newMenuFront.HeaderTitle,
        BrowserRouterDescription: newStr,
        BrowserRouterPermaLink: newMenuFront.HeaderPermaLink,
        BrowserRouterFuction: newMenuFront.HeaderTitle,
        BrowserRoutersisActive: true,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });

    if (newBlog.BrowserRoutersId != null) {
      var updatedMenus = await prisma.tblHeader.update({
        where: {
          id: newMenuFront.id,
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
      HeaderTitle,
      HeaderPermaLink,
      HeaderPerantId,
      HeaderIconPath,
      HeaderIcon,
      isMenu,
      MenuKey,
      HeaderisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
      serialNo,
      Author,
      flagSubMenu,
      BrowserRoutersId,
      HeaderMoblieIcon,
    } = req.body;

    if (HeaderIcon != null) {
      var ImageNameNew;
      const base64String = HeaderIcon;
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

    if (HeaderMoblieIcon != null) {
      var ImageNameNewIcon;
      const base64String = HeaderMoblieIcon;
      if (base64String.startsWith("data:image/svg+xml;base64,")) {
        const base64Data = base64String.replace(
          "data:image/svg+xml;base64,",
          ""
        );
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.svg`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNewIcon = imagePath.replace("./public/Images/", "");
        console.log("SVG Image saved successfully!", ImageNameNewIcon);
      } else if (base64String.startsWith("data:image/")) {
        const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const imagePath = `./public/Images/${Date.now()}_image.png`;
        fs.writeFileSync(imagePath, buffer);
        ImageNameNewIcon = imagePath.replace("./public/Images/", "");
        console.log("PNG/JPEG Image saved successfully!", ImageNameNewIcon);
      } else {
        console.log("Unsupported image format.");
      }
    }

    var updatedMenu;
    const menuIds = req.query.id.split(",").map((Id) => Number(Id));
    

    const updatedMenus = await Promise.all(
      menuIds.map(async (id, index) => {
        updatedMenu = await prisma.tblHeader.update({
          where: {
            id: id,
          },
          data: {
            MenuKey,
            flagSubMenu,
            HeaderTitle,
            HeaderPermaLink,
            HeaderPerantId,
            HeaderIconPath,
            HeaderIcon: ImageNameNew,
            isMenu,
            HeaderisActive,
            IsActive,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate,
            BrowserRoutersId,
            Author,
            serialNo,
            HeaderMoblieIcon: ImageNameNewIcon,
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
          BrowserRouterTitle: updatedMenu.HeaderTitle,
          BrowserRouterDescription: "Menu",
          BrowserRouterPermaLink: updatedMenu.HeaderPermaLink,
          BrowserRouterFuction: updatedMenu.HeaderTitle,
          BrowserRoutersisActive: true,
          CreatedBy,
          CreatedDate,
          ModifiedBy,
          ModifiedDate: new Date(),
        },
      });
    }
    console.log("updatedBrowserRouters", updatedMenus);

    if (HeaderPerantId != null) {
      await prisma.tblHeader.update({
        where: {
          id: HeaderPerantId,
        },
        data: {
          flagSubMenu: true,
        },
      });
    }

    const headersToUpdate = await prisma.tblHeader.findMany({
      where: {
        HeaderPerantId: null,
        HeaderisActive: true,
        flagSubMenu: true,
        NOT: {
          id: {
            in: await prisma.tblHeader
              .findMany({
                where: {
                  HeaderPerantId: {
                    not: null,
                  },
                },
                select: {
                  HeaderPerantId: true,
                },
              })
              .then((headers) =>
                headers.map((header) => header.HeaderPerantId)
              ),
          },
        },
      },
    });

    for (const header of headersToUpdate) {
      await prisma.tblHeader.update({
        where: {
          id: header.id,
        },
        data: {
          flagSubMenu: false,
        },
      });
    }

    const HeadersToUpdates = await prisma.tblHeader.findMany({
      where: {
        HeaderPerantId: {
          not: null,
        },
        flagSubMenu: false,
      },
    });

    for (const Headers of HeadersToUpdates) {
      await prisma.tblHeader.update({
        where: {
          id: Headers.id,
        },
        data: {
          flagSubMenu: true,
        },
      });
    }

    if (updatedMenu.HeaderisActive != true) {
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
    if (updatedMenu.HeaderisActive == true) {
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




// const saveImage = (base64String, folderPath = './public/Images') => {
//   if (base64String.startsWith("data:image/")) {
//     const extension = base64String.match(/\/(.*?);/)[1];
//     const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
//     const buffer = Buffer.from(base64Data, "base64");
//     const imagePath = `${folderPath}/${Date.now()}_image.${extension}`;
//     fs.writeFileSync(imagePath, buffer);
//     return imagePath.replace(`${folderPath}/`, "");
//   } else {
//     console.log("Unsupported image format.");
//     return null;
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const {
//       HeaderTitle,
//       HeaderPermaLink,
//       HeaderPerantId,
//       HeaderIcon,
//       isMenu,
//       MenuKey,
//       HeaderisActive,
//       IsActive,
//       CreatedBy,
//       CreatedDate,
//       ModifiedBy,
//       ModifiedDate,
//       serialNo,
//       Author,
//       flagSubMenu,
//       BrowserRoutersId,
//       HeaderMoblieIcon,
//     } = req.body;

//     let ImageNameNew = HeaderIcon ? saveImage(HeaderIcon) : null;
//     let ImageNameNewIcon = HeaderMoblieIcon ? saveImage(HeaderMoblieIcon) : null;

//     const menuIds = req.query.id.split(",").map(Number);
//     const menuIndexes = req.query.id.split(",").map((_, index) => index + 1);

//     const updatedMenus = await Promise.all(menuIds.map(async (id, index) => {
//       const updatedMenu = await prisma.tblHeader.update({
//         where: { id:menuIds },
//         data: {
//           MenuKey,
//           flagSubMenu,
//           HeaderTitle,
//           HeaderPermaLink,
//           HeaderPerantId,
//           HeaderIcon: ImageNameNew,
//           isMenu,
//           HeaderisActive,
//           IsActive,
//           CreatedBy,
//           CreatedDate,
//           ModifiedBy,
//           ModifiedDate,
//           BrowserRoutersId,
//           Author,
//           serialNo: serialNo || menuIndexes[index],
//           HeaderMoblieIcon: ImageNameNewIcon,
//         },
//       });

//       if (updatedMenu.BrowserRoutersId) {
//         await prisma.tblBrowserRouters.update({
//           where: { BrowserRoutersId: updatedMenu.BrowserRoutersId },
//           data: {
//             BrowserRouterTitle: updatedMenu.HeaderTitle,
//             BrowserRouterDescription: "Menu",
//             BrowserRouterPermaLink: updatedMenu.HeaderPermaLink,
//             BrowserRouterFuction: updatedMenu.HeaderTitle,
//             BrowserRoutersisActive: true,
//             CreatedBy,
//             CreatedDate,
//             ModifiedBy,
//             ModifiedDate: new Date(),
//           },
//         });
//       }

//       return updatedMenu;
//     }));

//     if (HeaderPerantId) {
//       await prisma.tblHeader.update({
//         where: { id: HeaderPerantId },
//         data: { flagSubMenu: true },
//       });
//     }

//     const headersToUpdate = await prisma.tblHeader.findMany({
//       where: {
//         HeaderPerantId: null,
//         HeaderisActive: true,
//         flagSubMenu: true,
//         NOT: {
//           id: {
//             in: await prisma.tblHeader.findMany({
//               where: { HeaderPerantId: { not: null } },
//               select: { HeaderPerantId: true },
//             }).then(headers => headers.map(header => header.HeaderPerantId)),
//           },
//         },
//       },
//     });

//     for (const header of headersToUpdate) {
//       await prisma.tblHeader.update({
//         where: { id: header.id },
//         data: { flagSubMenu: false },
//       });
//     }

//     const HeadersToUpdates = await prisma.tblHeader.findMany({
//       where: { HeaderPerantId: { not: null }, flagSubMenu: false },
//     });

//     for (const Headers of HeadersToUpdates) {
//       await prisma.tblHeader.update({
//         where: { id: Headers.id },
//         data: { flagSubMenu: true },
//       });
//     }

//     const updateRouterActiveStatus = async (isActive) => {
//       await prisma.tblBrowserRouters.update({
//         where: { BrowserRoutersId: updatedMenus[0].BrowserRoutersId },
//         data: {
//           BrowserRoutersisActive: isActive,
//           ModifiedDate: new Date(),
//         },
//       });
//     };

//     if (updatedMenus[0].HeaderisActive !== true) {
//       await updateRouterActiveStatus(false);
//     } else {
//       await updateRouterActiveStatus(true);
//     }

//     res.status(200).json({ Status: true, Message: "Update Success", result: updatedMenus });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     res.status(500).json({ Status: false, Message: "Internal Server Error" });
//   }
// };

// updateProduct = async (req, res) => {
//   try {
//     const {
//       HeaderTitle,
//       HeaderPermaLink,
//       HeaderPerantId,
//       HeaderIconPath,
//       HeaderIcon,
//       isMenu,
//       MenuKey,
//       HeaderisActive,
//       IsActive,
//       CreatedBy,
//       CreatedDate,
//       ModifiedBy,
//       ModifiedDate,
//       serialNo,
//       Author,
//       flagSubMenu,
//       BrowserRoutersId,
//       HeaderMoblieIcon,
//     } = req.body;

//     if (HeaderIcon != null) {
//       var ImageNameNew;
//       const base64String = HeaderIcon;
//       if (base64String.startsWith("data:image/svg+xml;base64,")) {
//         const base64Data = base64String.replace(
//           "data:image/svg+xml;base64,",
//           ""
//         );
//         const buffer = Buffer.from(base64Data, "base64");
//         const imagePath = `./public/Images/${Date.now()}_image.svg`;
//         fs.writeFileSync(imagePath, buffer);
//         ImageNameNew = imagePath.replace("./public/Images/", "");
//         console.log("SVG Image saved successfully!", ImageNameNew);
//       } else if (base64String.startsWith("data:image/")) {
//         const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
//         const buffer = Buffer.from(base64Data, "base64");
//         const imagePath = `./public/Images/${Date.now()}_image.png`;
//         fs.writeFileSync(imagePath, buffer);
//         ImageNameNew = imagePath.replace("./public/Images/", "");
//         console.log("PNG/JPEG Image saved successfully!", ImageNameNew);
//       } else {
//         console.log("Unsupported image format.");
//       }
//     }

//     if (HeaderMoblieIcon != null) {
//       var ImageNameNewIcon;
//       const base64String = HeaderMoblieIcon;
//       if (base64String.startsWith("data:image/svg+xml;base64,")) {
//         const base64Data = base64String.replace(
//           "data:image/svg+xml;base64,",
//           ""
//         );
//         const buffer = Buffer.from(base64Data, "base64");
//         const imagePath = `./public/Images/${Date.now()}_image.svg`;
//         fs.writeFileSync(imagePath, buffer);
//         ImageNameNewIcon = imagePath.replace("./public/Images/", "");
//         console.log("SVG Image saved successfully!", ImageNameNewIcon);
//       } else if (base64String.startsWith("data:image/")) {
//         const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
//         const buffer = Buffer.from(base64Data, "base64");
//         const imagePath = `./public/Images/${Date.now()}_image.png`;
//         fs.writeFileSync(imagePath, buffer);
//         ImageNameNewIcon = imagePath.replace("./public/Images/", "");
//         console.log("PNG/JPEG Image saved successfully!", ImageNameNewIcon);
//       } else {
//         console.log("Unsupported image format.");
//       }
//     }

//     if (!req.query.id) {
//       return res
//         .status(400)
//         .json({ Status: false, Message: "Id parameter is missing" });
//     }

//     const HeaderIds = req.query.id.split(",").map(Number);
//     const menuIndexes = req.query.id.split(",").map((_, index) => index + 1);
//     const updatedHeaders = await Promise.all(
//       HeaderIds.map(async (id, index) => {
//         return await prisma.tblHeader.update({
//           where: { id: id },
//           data: {
//             MenuKey,
//             flagSubMenu,
//             HeaderTitle,
//             HeaderPermaLink,
//             HeaderPerantId,
//             HeaderIconPath,
//             HeaderIcon: ImageNameNew,
//             isMenu,
//             HeaderisActive,
//             IsActive,
//             CreatedBy,
//             CreatedDate,
//             ModifiedBy,
//             ModifiedDate,
//             BrowserRoutersId,
//             Author,
//             serialNo: serialNo ? serialNo : menuIndexes[index],
//             HeaderMoblieIcon: ImageNameNewIcon,
//           },
//         });
//       })
//     );

//     for (const updatedHeader of updatedHeaders) {
//       const browserRouterData = {
//         BrowserRouterTitle: updatedHeader.HeaderTitle,
//         BrowserRouterDescription: "Header Menu",
//         BrowserRouterPermaLink: updatedHeader.HeaderPermaLink,
//         BrowserRouterFuction: updatedHeader.HeaderTitle,
//         CreatedBy,
//         CreatedDate,
//         ModifiedBy,
//         ModifiedDate: new Date(),
//       };

//       if (updatedHeader.BrowserRoutersId != null) {
//         await prisma.tblBrowserRouters.update({
//           where: { BrowserRoutersId: updatedHeader.BrowserRoutersId },
//           data: {
//             ...browserRouterData,
//             BrowserRoutersisActive: updatedHeader.HeaderisActive,
//           },
//         });
//       }
//     }

//     await prisma.tblHeader.updateMany({
//       where: {
//         HeaderPerantId: { not: null },
//       },
//       data: { flagSubMenu: false },
//     });

//     const HeadersToUpdate = await prisma.tblHeader.findMany({
//       where: {
//         HeaderPerantId: null,
//         flagSubMenu: false,
//       },
//     });

//     await Promise.all(
//       HeadersToUpdate.map(async (Headerdata) => {
//         return await prisma.tblHeader.update({
//           where: { id: Headerdata.id },
//           data: { flagSubMenu: true },
//         });
//       })
//     );

//     res.status(200).json({
//       Status: true,
//       Message: "Update Success",
//       result: updatedHeaders,
//     });
//   } catch (error) {
//     console.error("Error updating Header:", error);
//     res.status(500).json({ Status: false, Message: "Internal Server Error" });
//   }
// };

deleteProduct = async (req, res) => {
  try {
    const menuIds = req.query.id.split(",").map((Id) => Number(Id));

    const DeleteMenus = await Promise.all(
      menuIds.map(async (id, index) => {
        const DeleteMenu = await prisma.tblHeader.delete({
          where: {
            id: id,
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
