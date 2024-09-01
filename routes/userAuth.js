const jwt = require("jsonwebtoken");

const authenticaionToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res
      .status(401)
      .json({ message: "Authentication Token is required" });
  }

  jwt.verify(token, "bookStore", (err, user) => {
    if (err) {
      console.error("Token verification error:", err);  // Detailed logging
      return res.status(403).json({ message: "Token expired, please sign in again" });
    }
    req.user = user;
    next();
  });
  
  
};

module.exports = { authenticaionToken };
