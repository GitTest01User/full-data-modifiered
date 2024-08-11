const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const {
      BrowserRoutersPermaLink,
      BrowserRoutersId,
      BlogCategories,
      BrowserRoutersisActive,
    } = req.query;

    let tblBrowserRouters;
    const whereClause = {};

    if (BrowserRoutersId) {
      whereClause.BrowserRoutersId = parseInt(BrowserRoutersId);
    }
    if (BlogCategories) {
      whereClause.BlogCategories = parseInt(BlogCategories);
    }

    if (BrowserRoutersPermaLink) {
      whereClause.BrowserRoutersPermaLink = BrowserRoutersPermaLink;
    }

    if (BrowserRoutersisActive) {
      whereClause.BrowserRoutersisActive =
        BrowserRoutersisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblBrowserRouters = await prisma.tblBrowserRouters.findMany({
        where: whereClause,
      });
    } else {
      tblBrowserRouters = await prisma.tblBrowserRouters.findMany();
    }

    res.send({ Status: true, Message: "Success", result: tblBrowserRouters });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      BrowserRouterTitle,
      BrowserRouterDescription,
      BrowserRouterPermaLink,
      BrowserRouterFuction,
     
      CreatedBy,

      ModifiedBy,
      ModifiedDate,
    } = req.body;
    const newBlog = await prisma.tblBrowserRouters.create({
      data: {
        BrowserRouterTitle,
        BrowserRouterDescription,
        BrowserRouterPermaLink,
        BrowserRouterFuction,
        BrowserRoutersisActive: true,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });

   
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newBlog });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      BrowserRouterTitle,
      BrowserRouterDescription,
      BrowserRouterPermaLink,
      BrowserRouterFuction,
      BrowserRoutersisActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;
    const updatedBlog = await prisma.tblBrowserRouters.update({
      where: {
        BrowserRoutersId: Number(req.query.BrowserRoutersId),
      },
      data: {
        BrowserRouterTitle,
        BrowserRouterDescription,
        BrowserRouterPermaLink,
        BrowserRouterFuction,
        BrowserRoutersisActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate: new Date(),
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedBlog });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const deletedBlog = await prisma.tblBrowserRouters.delete({
      where: {
        BrowserRoutersId: Number(req.query.BrowserRoutersId),
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: deletedBlog });
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
