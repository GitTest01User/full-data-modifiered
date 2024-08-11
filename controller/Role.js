const { PrismaClient } = require("@prisma/client");
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
const prisma = new PrismaClient();
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

getProducts = async (req, res) => {
  try {
    const { RoleId, RoleName } = req.query;

    let tblRole;

    if (RoleId || RoleName) {
      tblRole = await prisma.tblRole.findMany({
        where: {
          OR: [
            { RoleId: parseInt(RoleId) || undefined },
            { RoleName: RoleName || undefined },
          ],
        },
      });
    } else {
      tblRole = await prisma.tblRole.findMany({
        orderBy: {
          RoleId: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblRole });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};

createProduct = async (req, res) => {
  try {
    const {
      RoleName,
      RoleKey
    } = req.body;

    const newUserRole = await prisma.tblRole.create({
      data: {
        RoleName,
        RoleKey,
        IsActive: true,
        CreatedDate: new Date(),
        
        ModifiedDate: new Date(),
      },
    });

    res.status(201).json({
      status: true,
      message: "Create Success",
      result: newUserRole,
    });
  } catch (error) {
    
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

updateProduct = async (req, res) => {
  try {
    const { RoleName, IsActive, CreatedBy, ModifiedBy ,RoleKey} = req.body;

    const UserRoles = req.query.RoleId.split(",").map((RoleId) => Number(RoleId));
    const updatedUsersRoles = await Promise.all(
      UserRoles.map(async (RoleId) => {
        const updatedRole = await prisma.tblRole.update({
          where: {
            RoleId: RoleId,
          },
          data: {
            RoleKey,
            RoleName,
            IsActive,
            CreatedBy,
            ModifiedBy,
            ModifiedDate: new Date(),
          },
        });

        return updatedRole;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Update Success",
      result: updatedUsersRoles,
    });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const DeleteUserRoleId = req.query.RoleId.split(",").map((RoleId) =>
      Number(RoleId)
    );
    const DeleteUserRoles = await Promise.all(
      DeleteUserRoleId.map(async (RoleId) => {
        const deletedRole = await prisma.tblRole.delete({
          where: {
            RoleId: RoleId,
          },
        });

        return deletedRole;
      })
    );

    res.status(200).json({
      Status: true,
      Message: "Delete Success",
      result: DeleteUserRoles,
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
