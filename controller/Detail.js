const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const { Id } = req.query;

    let tblDetails;

    if (Id) {
      tblDetails = await prisma.tblDetails.findMany({
        where: {
          OR: [{ Id: parseInt(Id) || undefined }],
        },
      });
    } else {
      tblDetails = await prisma.tblDetails.findMany();
    }

    res.send({ Status: true, Message: "Success", result: tblDetails });
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
      Title,
      Icon,
      Description,

      Author,

      CreatedBy,

      ModifiedBy,
      ModifiedDate,
    } = req.body;
    const newDetail = await prisma.tblDetails.create({
      data: {
        Title,
        Icon,
        Description,
        DetailsisActive: true,
        Author,

        CreatedBy,
        CreatedDate: new Date(),

        ModifiedBy,
        ModifiedDate,
      },
    });
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newDetail });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      Title,
      Icon,
      Description,
      DetailsisActive,
      Author,

      CreatedBy,
      CreatedDate,
      ModifiedBy,
    } = req.body;

    const Ids = req.query.Id.split(",").map((id) => Number(id));

    const updatedOpenningAll = await Promise.all(
      Ids.map(async (id) => {
        const updatedOpenning = await prisma.tblDetails.update({
          where: {
            Id: id,
          },
          data: {
            Title,
            Icon,
            Description,
            DetailsisActive,
            Author,

            Author,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

        return updatedOpenning;
      })
    );

    res.status(200).json({
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
    const Ids = req.query.Id.split(",").map((id) => Number(id));
    var updatedOpneingAll = await Promise.all(
      Ids.map(async (id) => {
        const deletedOpening = await prisma.tblDetails.delete({
          where: {
            Id: id,
          },
        });
        return deletedOpening;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: updatedOpneingAll,
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
