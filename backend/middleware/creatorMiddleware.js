const jwt = require("jsonwebtoken");
const userModel = require("../models/User");
require("dotenv").config();

const userMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY1); // Use env variable

    // Optional check
    if (!decoded?.email || !decoded?.id) {
      return res.status(403).json({ message: "Token is missing essential user data" });
    }

    // Fetch user from DB
    const resultUser = await userModel.findOne({ email: decoded.email });

    if (!resultUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (resultUser.role === "CREATOR") {
      req.user = decoded.id;
      next(); 
    } else {
      return res.status(403).json({ message: "Access denied. Not a CREATOR" });
    }

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token", error: err.message });
  }
};

module.exports = userMiddleware;
