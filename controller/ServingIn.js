const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();



getProducts = async (req, res) => {
  try {
    const { ServingId, ServinginisActive } = req.query;
    let tblServingIn;

    const whereClause = {};

    if (ServingId) {
      whereClause.ServingId = parseInt(ServingId);
    }

    if (ServinginisActive) {
      whereClause.ServinginisActive =
        ServinginisActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblServingIn = await prisma.tblServingIn.findMany({
        where: whereClause,
        orderBy: {
          ServingId: "desc",
        },
      });
    } else {
      tblServingIn = await prisma.tblServingIn.findMany({
        orderBy: {
          ServingId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblServingIn });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      ServinginCity,
      ServinginAddress,
      Author,
      IsActive,
      CreatedBy,

      ModifiedBy,
      ModifiedDate,
    } = req.body;
    const newServingIn = await prisma.tblServingIn.create({
      data: {
        ServinginCity,
        ServinginAddress,
        ServinginisActive: true,
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
      .json({ Status: true, Message: "Create Success", result: newServingIn });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      Author,
      ServinginCity,
      ServinginAddress,
      ServinginisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
    } = req.body;


    const ServingIds = req.query.ServingId.split(",").map((id) => Number(id));

    const updatedServingAll = await Promise.all(
      ServingIds.map(async (id) => {
        const updatedServing = await prisma.tblServingIn.update({
          where: {
            ServingId: id,
          },
          data: {
            Author,
            ServinginCity,
            ServinginAddress,
            ServinginisActive,
            IsActive,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

        return updatedServing;
      })
    );

 
    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedServingAll });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {

    const ServingIds = req.query.ServingId.split(",").map((id) => Number(id));
    var updatedServingAll = await Promise.all(
      ServingIds.map(async (id) => {
        const deletedServing = await prisma.tblServingIn.delete({
          where: {
            ServingId:id,
          },
        });
        return deletedServing;
      })
    );
   
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: updatedServingAll });
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
