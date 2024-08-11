const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const { BlogCateId, BlogCategories, BlogISActive } = req.query;

    let tblBlogCategories;
    const whereClause = {};

    if (BlogCateId) {
      whereClause.BlogCateId = parseInt(BlogCateId);
    }
    if (BlogCategories) {
      whereClause.BlogCategories = parseInt(BlogCategories);
    }

    if (BlogISActive) {
      whereClause.BlogISActive = BlogISActive.toLowerCase() === "true";
    }

    if (Object.keys(whereClause).length > 0) {
      tblBlogCategories = await prisma.tblBlogCategories.findMany({
        where: whereClause,
        orderBy: {
          BlogCateId: "desc",
        },
     
      });
    } else {
      tblBlogCategories = await prisma.tblBlogCategories.findMany({
        orderBy: {
          BlogCateId: "desc",
        },
   
      });
    }

    res.send({ Status: true, Message: "Success", result: tblBlogCategories });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
  
};

createProduct = async (req, res) => {
  try {
    const { BlogCategories, Author } = req.body;
    const newBlog = await prisma.tblBlogCategories.create({
      data: {
        BlogCategories,
        BlogCreatedDate: new Date(),
        BlogISActive: true,
        Author,
      },
    });
    res
      .status(201)
      .json({ Status: true, Message: "Create Success", result: newBlog });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const { BlogCategories, BlogISActive, Author } = req.body;
    const BlogCateIds = req.query.BlogCateId.split(",").map((id) => Number(id));

    var updatedBlogs = await Promise.all(
      BlogCateIds.map(async (id) => {
        const updatedBlog = await prisma.tblBlogCategories.update({
          where: {
            BlogCateId: id,
          },
          data: {
            BlogCategories,
            BlogCreatedDate: new Date(),
            BlogISActive,
            Author,
          },
        });

        return updatedBlog;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedBlogs });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

// deleteProduct = async (req, res) => {
//   try {
//     const BlogCateIds = req.query.BlogCateId.split(",").map((id) => Number(id));
//     const updatedBlogs = await Promise.all(
//       BlogCateIds.map(async (id) => {
//         const deletedBlog = await prisma.tblBlogCategories.delete({
//           where: {
//             BlogCateId: id,
//           },
//         });

//         return deletedBlog;
//       })
//     );
//     res
//       .status(200)
//       .json({ Status: true, Message: "Delete Success", result: updatedBlogs });
//   } catch (error) {
//     res.status(400).json({ Status: false, Message: "Internal Server Error" });
//   }
// };
// updateImage = async (req, res) => {
//   try {
//     const { filename } = req.file;

//     const updatedBlog = await prisma.tblRegister.update({
//       where: {
//         Id: Number(req.query.Id),
//       },
//       data: {
//         image_name: filename,
//       },
//     });

//     res
//       .status(200)
//       .json({ Status: true, Message: "Update Success", result: updatedBlog });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ Status: false, Message: "Internal Server Error" });
//   }
// };

deleteProduct = async (req, res) => {
  try {
    const BlogCateIds = req.query.BlogCateId.split(",").map((id) => Number(id));
    const updatedBlogs = await Promise.all(
      BlogCateIds.map(async (id) => {
        const deletedBlog = await prisma.tblBlogCategories.delete({
          where: {
            BlogCateId: id,
          },
        });

        return deletedBlog;
      })
    );

    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: updatedBlogs });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  //   updateImage,
};
