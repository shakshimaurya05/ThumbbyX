import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (
  req,
  res,
  next
) => {
  try {
    let token;

    const authHeader =
      req.headers.authorization;

    if (
      authHeader &&
      authHeader.startsWith("Bearer ")
    ) {
      token =
        authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Not authorized. No token provided.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    const user = await User.findById(
      decoded.id
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User no longer exists",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};
export const authorize = (
  ...roles
) => {
  return (req, res, next) => {
    if (
      req.user.role === "super_admin" &&
      roles.includes("admin")
    ) {
      return next();
    }

    if (
      !roles.includes(req.user.role)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied",
      });
    }

    next();
  };
};

export const authorizeSuperAdmin = (
  req,
  res,
  next
) => {
  if (req.user.role !== "super_admin") {
    return res.status(403).json({
      success: false,
      message:
        "Super Admin access required",
    });
  }

  next();
};
