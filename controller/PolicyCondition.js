const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const { Id, Route, PolicyConditionisActive } = req.query;

    let tblPolicyCondition;
    const whereClause = {};

    if (Id) {
      whereClause.Id = parseInt(Id);
    }
    if (Route) {
      whereClause.Route = Route;
    }

    if (PolicyConditionisActive) {
      whereClause.PolicyConditionisActive =
        PolicyConditionisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblPolicyCondition = await prisma.tblPolicyCondition.findMany({
        where: whereClause,
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
    } else {
      tblPolicyCondition = await prisma.tblPolicyCondition.findMany({
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

    res.send({ Status: true, Message: "Success", result: tblPolicyCondition });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};
createProduct = async (req, res) => {
  try {
    const {
      Title,

      ContentData,
      Route,
      Author,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;

    const existingLink = await prisma.tblPolicyCondition.findFirst({
      where: {
        Route,
      },
    });
    if (existingLink) {
      return res.status(400).json({
        Status: false,
        Message: "Route already exists Please change route link!",
      });
    }
    const newPolicyCondition = await prisma.tblPolicyCondition.create({
      data: {
        Title,
        Author,
        ContentData,
        Route,
        PolicyConditionisActive: true,
        IsActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
      },
    });

    const newBlog = await prisma.tblBrowserRouters.create({
      data: {
        BrowserRouterTitle: newPolicyCondition.Title,
        BrowserRouterDescription: "Policy Condition ",
        BrowserRouterPermaLink: newPolicyCondition.Route,
        BrowserRouterFuction: newPolicyCondition.Title,
        BrowserRoutersisActive: true,
        CreatedBy,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });

    if (newBlog.BrowserRoutersId != null) {
      var updatedMenus = await prisma.tblPolicyCondition.update({
        where: {
          Id: newPolicyCondition.Id,
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
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

// updateProduct = async (req, res) => {
//   try {
//     const {
//       Title,
//       PolicyConditionisActive,
//       ContentData,
//       Route,
//       Author,
//       IsActive,
//       CreatedBy,
//       CreatedDate,
//       ModifiedBy,
//       ModifiedDate,
//     } = req.body;

//     const PolicyIds = req.query.Id.split(",").map((id) => Number(id));

//     const updatedPolicyAll = await Promise.all(
//       PolicyIds.map(async (id) => {
//         const updatedPolicy = await prisma.tblPolicyCondition.update({
//           where: {
//             Id: id,
//           },
//           data: {
//             Title,
//             PolicyConditionisActive,
//             ContentData,
//             Route,
//             Author,
//             IsActive,
//             CreatedBy,
//             CreatedDate,
//             ModifiedBy,
//             ModifiedDate,
//           },
//         });

//         return updatedPolicy;
//       })
//     );

//     if (updatedPolicyAll.BrowserRoutersId != null) {
//       await prisma.tblBrowserRouters.update({
//         where: {
//           BrowserRoutersId: updatedPolicyAll.BrowserRoutersId,
//         },
//         data: {
//           BrowserRouterTitle: updatedPolicyAll.Title,
//           BrowserRouterDescription: "Policy Condition",
//           BrowserRouterPermaLink: updatedPolicyAll.Route,
//           BrowserRouterFuction: updatedPolicyAll.Title,
//           BrowserRoutersisActive: true,
//           CreatedBy,
//           CreatedDate,
//           ModifiedBy,
//           ModifiedDate: new Date(),
//         },
//       });
//     }
//     console.log("updatedBrowserRouters", updatedMenus);

//     res.status(200).json({
//       Status: true,
//       Message: "Update Success",
//       result: updatedPolicyAll,
//     });
//   } catch (error) {
//     res.status(400).json({ Status: false, Message: "Internal Server Error" });
//   }
// };

updateProduct = async (req, res) => {
  try {
    const {
      Title,
      PolicyConditionisActive,
      ContentData,
      Route,
      Author,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;

    const PolicyIds = req.query.Id.split(",").map((id) => Number(id));

    const updatedPolicyAll = await Promise.all(
      PolicyIds.map(async (id) => {
        const updatedPolicy = await prisma.tblPolicyCondition.update({
          where: {
            Id: id,
          },
          data: {
            Title,
            PolicyConditionisActive,
            ContentData,
            Route,
            Author,
            IsActive,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

        if (updatedPolicy.PolicyConditionisActive != true) {
          await prisma.tblBrowserRouters.update({
            where: {
              BrowserRoutersId: updatedPolicy.BrowserRoutersId,
            },
            data: {
              BrowserRoutersisActive: false,

              ModifiedDate: new Date(),
            },
          });
        }
        if (updatedPolicy.PolicyConditionisActive == true) {
          await prisma.tblBrowserRouters.update({
            where: {
              BrowserRoutersId: updatedPolicy.BrowserRoutersId,
            },
            data: {
              BrowserRoutersisActive: true,

              ModifiedDate: new Date(),
            },
          });
        }
        if (updatedPolicy.BrowserRoutersId != null) {
          await prisma.tblBrowserRouters.update({
            where: {
              BrowserRoutersId: updatedPolicy.BrowserRoutersId,
            },
            data: {
              BrowserRouterTitle: updatedPolicy.Title,
              BrowserRouterDescription: "Policy Condition",
              BrowserRouterPermaLink: updatedPolicy.Route,
              BrowserRouterFuction: updatedPolicy.Title,
              BrowserRoutersisActive: true,
              CreatedBy,
              CreatedDate,
              ModifiedBy,
              ModifiedDate,
            },
          });
        }

        return updatedPolicy;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Update Success",
      result: updatedPolicyAll,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const PolicyIds = req.query.Id.split(",").map((id) => Number(id));
    var updatedPolicyAll = await Promise.all(
      PolicyIds.map(async (id) => {
        const deletedPolicy = await prisma.tblPolicyCondition.delete({
          where: {
            Id: id,
          },
        });
        return deletedPolicy;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: updatedPolicyAll,
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
