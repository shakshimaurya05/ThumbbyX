import { sendEmail }
from "../services/emailService.js";

import User from "../models/User.js";
import CustomerProfile from "../models/CustomerProfile.js";
import ContractorProfile from "../models/ContractorProfile.js";
import { sendTokenResponse }
from "../utils/sendTokenResponse.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { logActivity } from "../utils/activityLogger.js";
const checkExistingUser = async (email, phone) => {
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  const existingPhone = await User.findOne({ phone });

  if (existingPhone) {
    throw new Error("Phone already exists");
  }
};

export const registerCustomer = async (
  req,
  res
) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      state,
      password,
      confirmPassword,
    } = req.body || {};

    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const existingEmail =
      await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const existingPhone =
      await User.findOne({ phone });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone already exists",
      });
    }

    const user = await User.create({
      fullName,
      email,
      phone,
      password,
      role: "customer",
    });

    await CustomerProfile.create({
      userId: user._id,
      city,
      state,
    });

    return res.status(201).json({
      success: true,
      message:
        "Customer registered successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const registerContractor = async (
  req,
  res
) => {
  try {
    const {
      fullName,
      email,
      phone,
      city,
      state,
      password,
      confirmPassword,
    } = req.body || {};

    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !state ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    await checkExistingUser(
      email,
      phone
    );

    const user = await User.create({
      fullName,
      email,
      phone,
      password,
      role: "contractor",
    });

    await ContractorProfile.create({
      userId: user._id,
      city,
      state,
    });

    return res.status(201).json({
      success: true,
      message:
        "Contractor registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required",
      });
    }

    const user =
      await User.findOne({ email })
        .select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message:
          "Account is disabled",
      });
    }

    const isMatch =
      await user.comparePassword(
        password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    user.lastLogin =
      new Date();

    await user.save({
      validateBeforeSave: false,
    });

    if (
      user.role === "admin" ||
      user.role === "super_admin"
    ) {
      await logActivity({
        req: { ...req, user },
        action: "Admin Login",
        module: "Authentication",
        targetId: user._id,
        targetType: "User",
        description: `${user.role} logged in: ${user.email}`,
      });
    }

    return sendTokenResponse(
      user,
      200,
      res
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
};

export const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken =
      user.generatePasswordResetToken();

    await user.save({
      validateBeforeSave: false,
    });

    const resetUrl =
      `${process.env.FRONTEND_URL}` +
      `/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,

      subject:
        "ThumbbyX Password Reset",

      html: `
        <h2>Password Reset Request</h2>

        <p>Hello ${user.fullName},</p>

        <p>Click the link below to reset your password:</p>

        <a href="${resetUrl}">
          Reset Password
        </a>

        <p>
          This link expires in
          15 minutes.
        </p>
      `,
    });

    return res.status(200).json({
      success: true,
      message:
        "Password reset email sent",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const resetPassword = async (
  req,
  res
) => {
  try {
    const { token } = req.params;

    const { password, confirmPassword } =
      req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        $gt: Date.now(),
      },
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid or expired token",
      });
    }

    user.password = password;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password reset successful",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCurrentUser = async (
  req,
  res
) => {
  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      onboardingCompleted:
  req.user.onboardingCompleted,
    },
  });
};
export const logout = async (
  req,
  res
) => {
  try {
    const refreshToken =
      req.cookies.refreshToken;

    if (refreshToken) {
      const user =
        await User.findOne({
          refreshToken,
        });

      if (user) {
        user.refreshToken = null;

        await user.save({
          validateBeforeSave: false,
        });
      }
    }

    res.clearCookie(
      "refreshToken"
    );

    return res.status(200).json({
      success: true,
      message:
        "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const refreshAccessToken =
  async (req, res) => {
    try {
      const refreshToken =
        req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message:
            "Refresh token missing",
        });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET
      );

      const user =
        await User.findById(
          decoded.id
        );

      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "User not found",
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: "Account is disabled",
        });
      }

      if (
        user.refreshToken !==
        refreshToken
      ) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid refresh token",
        });
      }

      const accessToken =
        user.generateAccessToken();

      return res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message:
          "Refresh token expired",
      });
    }
  };
  export const setupSuperAdmin = async (
  req,
  res
) => {
  try {
    const setupKey =
      req.headers["x-admin-setup-key"];

    if (
      !process.env.ADMIN_SETUP_KEY ||
      setupKey !== process.env.ADMIN_SETUP_KEY
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid setup key",
      });
    }

    const existingSuperAdmin =
      await User.findOne({
        role: "super_admin",
      });

    if (existingSuperAdmin) {
      return res.status(400).json({
        success: false,
        message: "Super Admin already exists",
      });
    }

    const {
      fullName,
      email,
      phone,
      password,
    } = req.body || {};

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await checkExistingUser(
      email,
      phone
    );

    const superAdmin = await User.create({
      fullName,
      email,
      phone,
      password,
      role: "super_admin",
    });

    return res.status(201).json({
      success: true,
      message:
        "Super Admin created successfully",
      user: {
        id: superAdmin._id,
        fullName: superAdmin.fullName,
        email: superAdmin.email,
        phone: superAdmin.phone,
        role: superAdmin.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
