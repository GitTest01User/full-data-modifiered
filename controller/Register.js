const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const { UserId } = req.query;

    let tblUser;

    if (UserId) {
      tblUser = await prisma.tblUser.findMany({
        where: {
          OR: [{ UserId: parseInt(UserId) || undefined }],
        },
      });
    } else {
      tblUser = await prisma.tblUser.findMany({
        orderBy: {
          UserId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblUser });
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
      FirstName,
      LastName,
      Email,
      Password,
      Phone,
      Gender,
      imageName,
      UserStatus,
      LastLogin,
      CompanyId,
      UserisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;

    if (imageName != null) {
      var ImageNameNew;
      const base64String = imageName;
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
    const newRegister = await prisma.tblUser.create({
      data: {
        FirstName,
        LastName,
        Email,
        Password,
        Phone,
        Gender,
        imageName: ImageNameNew,
        UserStatus,
        LastLogin,
        CompanyId,
        UserisActive,
        IsActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
      },
    });
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newRegister });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      Password,
      Phone,
      Gender,
      imageName,
      UserStatus,
      LastLogin,
      CompanyId,
      UserisActive,
      IsActive,
      CreatedBy,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;
    if (imageName != null) {
      var ImageNameNew;
      const base64String = imageName;
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
    const updatedRegister = await prisma.tblUser.update({
      where: {
        UserId: Number(req.query.UserId),
      },
      data: {
        FirstName,
        LastName,
        Email,
        Password,
        Phone,
        Gender,
        imageName: ImageNameNew,
        UserStatus,
        LastLogin,
        CompanyId,
        UserisActive,
        IsActive,
        CreatedBy,
        CreatedDate,
        ModifiedBy,
        ModifiedDate,
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedRegister });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const deletedRegister = await prisma.tblUser.delete({
      where: {
        UserId: Number(req.query.UserId),
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: deletedRegister });
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
