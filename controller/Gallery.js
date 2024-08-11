const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

getProducts = async (req, res) => {
  try {
    const { featuredImage, featuredId } = req.query;

    let tblGalleryImage;

    if (featuredId || featuredImage) {
      tblGalleryImage = await prisma.tblGalleryImage.findMany({
        where: {
          OR: [
            { featuredId: parseInt(featuredId) || undefined },
            { featuredImage: featuredImage || undefined },
          ],
        },
      });
    } else {
      tblGalleryImage = await prisma.tblGalleryImage.findMany({
        orderBy: {
          Id: "desc",
        },
      });
    }

    res.send({ Status: true, Message: "Success", result: tblGalleryImage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};



createProduct = async (req, res) => {
    try {
      const { filename } = req.file; 
  

      const createdImage = await prisma.tblGalleryImage.create({
        data: {
          featuredImage: filename,

        },
      });
  
      res.status(200).json({
        Status: true,
        Message: 'Image uploaded successfully',
        result: createdImage,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ Status: false, Message: 'Internal Server Error' });
    }
  };
  

  

updateProduct = async (req, res) => {
  try {
    const { featured } = req.file;
    const updatedGallery = await prisma.tblGalleryImage.update({
      where: {
        featuredId: Number(req.query.featuredId),
      },
      data: {
        featuredImage: featured,
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedGallery });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

deleteProduct = async (req, res) => {
  try {
    const deletedGallery = await prisma.tblGalleryImage.delete({
      where: {
        featuredId: Number(req.query.featuredId),
      },
    });
    res
      .status(200)
      .json({ Status: true, Message: "Delete Success", result: deletedGallery });
  } catch (error) {
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};
updateImage = async (req, res) => {
  try {
    const { filename } = req.file;

    const updatedGallery = await prisma.tblGalleryImage.update({
      where: {
        featuredId: Number(req.query.featuredId),
      },
      data: {
        featuredImage: filename,
      },
    });

    res
      .status(200)
      .json({ Status: true, Message: "Update Success", result: updatedGallery });
  } catch (error) {
    console.error(error);
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
