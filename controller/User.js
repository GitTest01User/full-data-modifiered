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
    const { Id, user_role_Id } = req.query;

    var tblRegister;
    var permissions = {};

    if (Id || user_role_Id) {
      tblRegister = await prisma.tblRegister.findMany({
        where: {
          OR: [
            { Id: parseInt(Id) || undefined },
            { user_role_Id: parseInt(user_role_Id) || undefined },
          ],
        },
        include: { tblRole: true },
      });

      tblRegister.forEach((entry) => {
        if (entry.tblRole && entry.tblRole.RoleKey) {
          const roleKeyUser = entry.tblRole.RoleKey;

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
      });
    } else {
      tblRegister = await prisma.tblRegister.findMany({
        orderBy: {
          Id: "desc",
        },
      });
    }

    res.status(200).json({
      Status: true,
      Message: "Success",
      result: tblRegister,
      permissions: permissions,
    });
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
      first_name,
      last_name,
      user_email,
      user_phone,
      user_pass,
      user_gender,
      image_name,
      user_login,
      user_last_login,
      user_role_Id,
    } = req.body;

    const existingUser = await prisma.tblRegister.findFirst({
      where: {
        user_email,
      },
    });
    const existingPhone = await prisma.tblRegister.findFirst({
      where: {
        user_phone,
      },
    });

    if (!first_name || !user_email || !user_phone || !user_pass) {
      return res.status(201).json({
        status: false,
        message: "Required User information is missing!",
      });
    }

  
    
    if (existingPhone && existingUser) {
      return res.status(201).json({
        status: false,
        message: "Details already exists! Please change your email and  phone number.",
      });
    }
    if (existingUser) {
      return res.status(201).json({
        status: false,
        message: "Email already exists! Please change your email.",
      });
    }
    if (existingPhone) {
      return res.status(201).json({
        status: false,
        message: "Phone already exists! Please change your phone number.",
      });
    }
    if (image_name != null) {
      var ImageNameNew;
      const base64String = image_name;
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
    
    const newUser = await prisma.tblRegister.create({
      data: {
        first_name,
        last_name,
        user_email,
        user_phone,
        user_pass,
        
        image_name: ImageNameNew,
        user_login :null,
        user_status: true,
        user_registered: new Date(),
        user_last_login:null,
        user_role_Id,
      },
    });

    res.status(201).json({
      status: true,
      message: "User created successfully",
      result: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
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
      user_role_Id,
    } = req.body;

    if (image_name != null) {
      var ImageNameNew;
      const base64String = image_name;
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
    

    const Users = req.query.Id.split(",").map((id) => Number(id));
    const updatedUsers = await Promise.all(
      Users.map(async (id) => {
        const updatedUser = await prisma.tblRegister.update({
          where: {
            Id: id,
          },
          data: {
            first_name,
            last_name,
            user_email,
            user_phone,
            user_pass,
            user_gender,
            image_name: ImageNameNew,
            user_login,
            user_status,
            user_registered,
            user_role_Id,
            user_last_login: new Date(),
          },
        });

        return updatedUser;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedUsers });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const DeleteUserId = req.query.Id.split(",").map((id) => Number(id));
    const DeleteUsers = await Promise.all(
      DeleteUserId.map(async (id) => {
        const deletedUser = await prisma.tblRegister.delete({
          where: {
            Id: id,
          },
        });

        return deletedUser;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: DeleteUsers });
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
