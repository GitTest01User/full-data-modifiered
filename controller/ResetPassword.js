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

createProduct = async (req, res) => {
  try {
    const { user_email, user_pass } = req.body;

    const user = await prisma.tblRegister.findFirst({
      where: {
        user_email,
        user_pass,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    // User exists; generate a JWT token
    const token = jwt.sign(
      { Id: user.Id, user_email: user.user_email },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: true,
      message: "Login successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      status: false,
      message: "Login failed, Token Is Not Found",
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
    const updatedResetPassword = await prisma.tblRegister.update({
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
      .json({ Status: true, Message: "Update Success", result: updatedResetPassword });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const deletedResetPassword = await prisma.tblRegister.delete({
      where: {
        Id: Number(req.query.Id),
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: deletedResetPassword });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

passwordRequest = async (req, res) => {
  const { user_email } = req.body;

  // Check if the user exists in the database
  const user = await prisma.tblRegister.findFirst({
    where: {
      user_email,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: false,

      message: "User not found",
    });
  }

  const resetToken = jwt.sign(
    { userId: user.Id, user_email: user.user_email },
    "YOUR_RESET_PASSWORD_SECRET_KEY",
    { expiresIn: "1h" }
  );
  res.status(200).json({
    status: true,
    user_email,
    resetToken,
    message: "Reset password link sent successfully",
  });
};

resetToken = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "YOUR_RESET_PASSWORD_SECRET_KEY");
    const { userId } = decodedToken;

    const { newPassword } = req.body;

    await prisma.tblRegister.update({
      where: {
        Id: userId,
      },
      data: {
        user_pass: newPassword,
      },
    });

    res.json({ status: true, message: "Password reset successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: false,
        message: "Token expired, please request a new reset link",
      });
    }
    return res
      .status(400)
      .json({ status: false, message: "Invalid or expired token" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  passwordRequest,
  resetToken,
};
