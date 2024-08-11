const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "your_secret_key"; 

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Token is missing" });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Authentication failed: Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = {
  authenticateToken,
};
