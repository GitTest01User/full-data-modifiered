const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const { ParentId, FAQId, FAQISActive, FAQModel, FaqFlag } = req.query;
    let tblFAQ;

    const whereClause = {};

    if (FAQId) {
      whereClause.FAQId = parseInt(FAQId);
    }
    if (ParentId) {
      whereClause.ParentId = parseInt(ParentId);
    }
    if (FAQModel) {
      whereClause.FAQModel = FAQModel;
    }

    if (FaqFlag) {
      whereClause.FaqFlag = FaqFlag.toLowerCase() === "true";
    }
    if (FAQISActive) {
      whereClause.FAQISActive = FAQISActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblFAQ = await prisma.tblFAQ.findMany({
        where: whereClause,
        // orderBy: {
        //   FAQId: "desc",
        // },
      });
    } else {
      tblFAQ = await prisma.tblFAQ.findMany({
        orderBy: {
          FAQId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblFAQ });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      FAQTitle,
      FAQContents,
      ParentId,
      FAQModel,
      FaqFlag,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
      Author,
      IsHeading,
    } = req.body;

    const newFaq = await prisma.tblFAQ.create({
      data: {
        FaqFlag,
        FAQTitle,
        FAQContents,
        ParentId,
        FAQModel,
        FAQISActive: true,
        IsActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
        Author,
        IsHeading,
      },
    });
    console.log(newFaq.FAQId);
    if (newFaq.IsHeading === true) {
      await prisma.tblFAQ.update({
        where: {
          FAQId: Number(newFaq.FAQId),
        },
        data: {
          ParentId: newFaq.FAQId,
        },
      });
    }

    res.status(201).json({
      Status: true,
      Message: "Create Success",
      result: newFaq,
    });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      FaqFlag,
      FAQTitle,
      FAQContents,
      ParentId,
      FAQModel,
      FAQISActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
      Author,
      IsHeading,
    } = req.body;

    const FAQIds = req.query.FAQId.split(",").map((id) => Number(id));

    const updatedFaqs = await Promise.all(
      FAQIds.map(async (id) => {
        const updatedFaq = await prisma.tblFAQ.update({
          where: {
            FAQId: id,
          },
          data: {
            FaqFlag,
            FAQTitle,
            FAQContents,
            ParentId,
            FAQModel,
            FAQISActive,
            IsActive,
            CreatedBy,
            CreatedDate,
            ModifiedBy,
            ModifiedDate,
            Author,
            IsHeading,
          },
        });
        return updatedFaq;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedFaqs });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};



deleteProduct = async (req, res) => {
  try {
    const FAQIds = req.query.FAQId.split(",").map((id) => Number(id));
    const updatedFaqs = await Promise.all(
      FAQIds.map(async (id) => {
        const deletedFaq = await prisma.tblFAQ.delete({
          where: {
            FAQId: id,
          },
        });

        return deletedFaq;
      })
    );
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: updatedFaqs });
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
