import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes - Token Based Authentication
export const requiresignin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Malformed token" });
    }

    // Verify JWT Token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// Admin Access Middleware
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized Access" });
    }
    next();
  } catch (error) {
    console.error("Admin Authorization Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in admin authentication" });
  }
};
