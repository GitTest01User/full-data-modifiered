

const { PrismaClient } = require("@prisma/client");
const nodemailer = require("nodemailer");
const prisma = new PrismaClient();
const axios = require("axios");








getProducts = async (req, res) => {
  try {
    const { Id, Phone,Email,SourcePage } = req.query;

    let tblEnquiry;
    const whereClause = {};

    if (Id) {
      whereClause.Id = parseInt(Id);
    }
    

    if (Phone) {
      whereClause.Phone = Phone;
    }

    if (Email) {
      whereClause.Email = Email;
    }


    if (SourcePage) {
      whereClause.SourcePage = SourcePage;
    }

   

    if (Object.keys(whereClause).length > 0) {
      tblEnquiry = await prisma.tblEnquiry.findMany({
        where: whereClause,
        orderBy: {
          Id: "desc",
        },
       
      });
    } else {
      tblEnquiry = await prisma.tblEnquiry.findMany({
        orderBy: {
          Id: "desc",
        },
      
      });
    }

    res.send({ Status: true, Message: "Success", result: tblEnquiry });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ Status: false, Message: "Internal Server Error" });
  }
};


createProduct = async (req, res) => {
  try {
    const {
      Appliance,
      Condition,

      Name,
      Phone,
      Email,
      City,
      PinCode,
      Message,
      SourcePage,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;

    const newEnquiry = await prisma.tblEnquiry.create({
      data: {
        Appliance,
        Condition,
        EnquiryisActive: true,
        Name,
        Phone,
        Email,
        City,
        PinCode,
        Message,
        SourcePage,
        CreatedDate: new Date(),
        ModifiedBy,
        ModifiedDate,
      },
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      auth: {
        user: "test@digi2l.in",
        pass: "test@Digi2l321",
      },
    });
    const mailOptions = {
      from: "test@digi2l.in",
      to: Email,
      subject: `Enquiry Recieved -${SourcePage} `,

      html: `Dear ${Name},<br><br/>
        Thank you for connecting with Digi2L- India’s First Digital
         Platform to sell used appliances. We have received your enquiry and
          we will shortly connect with you.
          <br><br/>Team Digi2L `,
    };
    const mailCustomercare = {
      from: "test@digi2l.in",
      to: "vkhare0876@gmail.com",
      subject: `Digi2L -Enquiry -${SourcePage} `,

      html: `Dear Team <br><br/>
       We have a new enquiry on the website. Please find the 
       ${SourcePage} enquiry details below-
        <br> <br/>     
        
       Contact Person Name-${Name} 
            <br> Appliance- ${Appliance}
            <br>Condition -${Condition} 
            <br>City-${City}
            <br>PinCode-${PinCode}
            <br>Phone- ${Phone}
            <br>Email- ${Email}
           <br>Message- ${Message}
         
            <br><br/>
            Thank You !`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Customer sent: " + info.response);
      }
    });

    transporter.sendMail(mailCustomercare, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Customercare sent: " + info.response);
      }
    });
    res;

    const FormData = require("form-data");
    let data = new FormData();
    data.append("apikey", "MzEzOTRjMzU3NjU1MzM1YTU3NTI3MDZjNmE0Yjc5NmI=");
    data.append("numbers", `${Phone}`);
    data.append("sender", "THEUTC");
    data.append(
      "message",
      "Dear Customer - Thank you for registering your Enquiry on Digi2L. We will shortly get in touch with you. By UTC Digital Technologies."
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.textlocal.in/send/",
      headers: {},
      data: data,
    };

    axios.request(config).then((response) => {
      console.log(JSON.stringify(response.data));
    });
    res.status(200).json({
      status: "Success",
      message: "Thank you for your message. It has been sent.",
      newEnquiry: newEnquiry,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ Status: false, Message: "Internal Server Error" });
  }
};

updateProduct = async (req, res) => {
  try {
    const {
      Appliance,
      Condition,
      EnquiryisActive,
      Name,
      Phone,
      Email,
      City,
      PinCode,
      Message,

      SourcePage,
      CreatedDate,
      ModifiedBy,
      ModifiedDate,
    } = req.body;

    const Ids = req.query.Id.split(",").map((id) => Number(id));

    const updatedOpenningAll = await Promise.all(
      Ids.map(async (id) => {
        const updatedOpenning = await prisma.tblEnquiry.update({
          where: {
            Id: id,
          },
          data: {
            Appliance,
            Condition,
            EnquiryisActive,
            Name,
            Phone,
            Email,
            City,
            PinCode,
            Message,
            SourcePage,

            SourcePage,
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
        const deletedOpening = await prisma.tblEnquiry.delete({
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
