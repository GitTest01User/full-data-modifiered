

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const port = process.env.PORT || 8000;
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json({ limit: "35mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "35mb",
    parameterLimit: 50000,
  })
);
app.use(express.json());

// Serve static files
app.use(
  "/digi2l/assets/images/",
  express.static(path.join(__dirname, "./public/Images"))
);

// Define storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routers
const routers = [
  "Blogs",
  "FAQ",
  "Press",
  "Stories",
  "Testimonial",
  "LifeSlider",
  "Opening",
  "Partner",
  "OngoingOffers",
  "Servingin",
  "Register",
  "PolicyDetail",
  "ExcitingOffers",
  "ContectUs",
  "Exchange",
  "ABB",
  "CircularEconomy",
  "EnterpriseSales",
  "LogisticsPartnership",
  "ProgramPartnership",
  "CorporateEnquiry",
  "Reseller",
  "About",
  "Enquiry",
  "Login",
  "Menu",
  "FooterMenu",
  "ResetPassword",
  "BlogsCategory",
  "Gallery",
  "Role",
  "Follow",
  "FollowIcon",
  "logo",
  "ResellerCounter",
  "QuickLink",
  "Detail",
  "FooterLogo",
  "BrowserRoute",
];

routers.forEach((route) => {
  const router = require(`./router/${route}`);
  app.use(router);
});



app.post("/Status/Digi2l/single", upload.single("image"), (req, res) => {
  if (req.file) {
    res.status(200).json({
      Status: true,
      Message: "Create Success",
      file: req.file.filename,
    });
  } else {
    res.status(400).send("Please upload a valid image");
  }
});
app.use(express.static(path.join(__dirname, "Frontend", "build")));
app.use(express.static(path.join(__dirname, "Admin", "build")));

app.get("*", (req, res) => {
  if (req.path.startsWith("/backend")) {
    res.sendFile(path.resolve(__dirname,"Admin", "build", "index.html"));
  
  } else {
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
  }
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
