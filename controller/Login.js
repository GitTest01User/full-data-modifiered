const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "12345678";

getProducts = async (req, res) => {
  try {
    const { Id } = req.query;

    let tblRegister;

    if (Id) {
      tblRegister = await prisma.tblRegister.findMany({
        where: {
          OR: [{ Id: parseInt(Id) || undefined }],
        },
      });
    } else {
      tblRegister = await prisma.tblRegister.findMany({
        orderBy: {
          Id: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblRegister });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .send({ Status: false, Message: "Internal Server Error", error: error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { user_email, user_pass } = req.body;
    let permissions = {};

    const user = await prisma.tblRegister.findFirst({
      where: {
        user_email,
        user_pass,
      },
      include: { tblRole: true },
    });

    if (!user) {
      res.status(401).json({
        message: "Authentication failed! Please check your email and password.",
      });
      return;
    }

    const roleKeyUser = user.tblRole?.RoleKey;

    if (roleKeyUser) {
      if (roleKeyUser === "Super_Admin") {
        permissions = {
          canView: true,
          canSidebarMenuView: true,
          canActionView: true,
          canEdit: true,
          canDelete: true,
        };
      } else if (roleKeyUser === "Admin") {
        permissions = {
          canView: true,
          canEdit: true,
          canDelete: false,
        };
      } else if (roleKeyUser === "Editer") {
        permissions = {
          canView: true,
          canEdit: false,
          canDelete: false,
        };
      }
    }

    const token = jwt.sign(
      { Id: user.Id, user_email: user.user_email },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: true,
      message: "Login successful",
      token: token,
      user: user,
      permissions: permissions,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      status: false,
      message: "Login failed. An error occurred.",
    });
  }
};


updateProduct = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      user_email,
      user_phone,
      user_pass,
      user_gender,
      image_name,
      user_login,
      user_status,
      user_registered,
      user_last_login,
    } = req.body;
    const updatedLogin = await prisma.tblRegister.update({
      where: {
        Id: Number(req.query.Id),
      },
      data: {
        first_name,
        last_name,
        user_email,
        user_phone,
        user_pass,
        user_gender,
        image_name,
        user_login,
        user_status,
        user_registered,
        user_last_login,
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedLogin });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateImage = async (req, res) => {
  try {
    const { filename } = req.file;

    const updatedLogin = await prisma.tblRegister.update({
      where: {
        Id: Number(req.query.Id),
      },
      data: {
        image_name: filename,
      },
    });

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedLogin });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const deletedLogin = await prisma.tblRegister.delete({
      where: {
        Id: Number(req.query.Id),
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: deletedLogin });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateImage,
};
