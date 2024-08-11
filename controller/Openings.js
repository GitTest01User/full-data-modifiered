const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const { OpeningsId } = req.query;

    let tblOpenings;

    if (OpeningsId) {
      tblOpenings = await prisma.tblOpenings.findMany({
        where: {
          OR: [{ OpeningsId: parseInt(OpeningsId) || undefined }],
        },
      });
    } else {
      tblOpenings = await prisma.tblOpenings.findMany({
        orderBy: {
          OpeningsId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblOpenings });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ Status: false, Message: "Internal Server Error", error: error });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      OpeningsTitle,
      OpeningsExperience,
      OpeningsCity,
      OpeningsContents,
      Author,
      IsActive,
      CreatedBy,

      ModifiedBy,
      ModifiedDate,
    } = req.body;
    const newOpening = await prisma.tblOpenings.create({
      data: {
        OpeningsTitle,
        OpeningsExperience,
        OpeningsCity,
        OpeningsContents,
        OpeningsisActive: true,
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
      .json({ Status: true, Message: "Create Success", result: newOpening });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      OpeningsTitle,
      OpeningsExperience,
      OpeningsCity,
      OpeningsContents,
      OpeningsisActive,
      Author,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;

    const OpeningsIds = req.query.OpeningsId.split(",").map((id) => Number(id));

    const updatedOpenningAll = await Promise.all(
      OpeningsIds.map(async (id) => {
        const updatedOpenning = await prisma.tblOpenings.update({
          where: {
            OpeningsId: id,
          },
          data: {
            OpeningsTitle,
            OpeningsExperience,
            OpeningsCity,
            OpeningsContents,
            OpeningsisActive,
            IsActive,
            Author,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate,
          },
        });

        return updatedOpenning;
      })
    );

    res
      .status(200)
      .json({
        Status: true,
        Message: "Update Success",
        result: updatedOpenningAll,
      });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {

    const OpeningsIds = req.query.OpeningsId.split(",").map((id) => Number(id));
    var updatedOpneingAll = await Promise.all(
      OpeningsIds.map(async (id) => {
        const deletedOpening = await prisma.tblOpenings.delete({
          where: {
            OpeningsId:id,
          },
        });
        return deletedOpening;
      })
    );

  
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: updatedOpneingAll });
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
