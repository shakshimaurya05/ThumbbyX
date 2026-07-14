import User from "../models/User.js";
import ActivityLog from "../models/ActivityLog.js";
import { logActivity } from "../utils/activityLogger.js";

const adminFields =
  "fullName email phone role isActive createdAt updatedAt lastLogin";

export const listAdmins = async (req, res) => {
  try {
    const admins = await User.find({
      role: "admin",
    })
      .select(adminFields)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const createAdminUser = async (req, res) => {
  try {
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

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or phone already exists",
      });
    }

    const admin = await User.create({
      fullName,
      email,
      phone,
      password,
      role: "admin",
    });

    await logActivity({
      req,
      action: "Create Admin",
      module: "Admin Management",
      targetId: admin._id,
      targetType: "User",
      description: `Created admin ${admin.email}`,
    });

    return res.status(201).json({
      success: true,
      admin: {
        id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        phone: admin.phone,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    const admin = await User.findOne({
      _id: req.params.id,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const { fullName, email, phone } = req.body || {};

    if (fullName !== undefined) admin.fullName = fullName;
    if (email !== undefined) admin.email = email;
    if (phone !== undefined) admin.phone = phone;

    await admin.save();

    await logActivity({
      req,
      action: "Edit Admin",
      module: "Admin Management",
      targetId: admin._id,
      targetType: "User",
      description: `Updated admin ${admin.email}`,
    });

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const disableAdminUser = async (req, res) => {
  try {
    const admin = await User.findOneAndUpdate(
      { _id: req.params.id, role: "admin" },
      { isActive: false },
      { new: true }
    ).select(adminFields);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await logActivity({
      req,
      action: "Disable Admin",
      module: "Admin Management",
      targetId: admin._id,
      targetType: "User",
      description: `Disabled admin ${admin.email}`,
    });

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const enableAdminUser = async (req, res) => {
  try {
    const admin = await User.findOneAndUpdate(
      { _id: req.params.id, role: "admin" },
      { isActive: true },
      { new: true }
    ).select(adminFields);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await logActivity({
      req,
      action: "Enable Admin",
      module: "Admin Management",
      targetId: admin._id,
      targetType: "User",
      description: `Enabled admin ${admin.email}`,
    });

    return res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteAdminUser = async (req, res) => {
  try {
    const admin = await User.findOne({
      _id: req.params.id,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await admin.deleteOne();

    await logActivity({
      req,
      action: "Delete Admin",
      module: "Admin Management",
      targetId: admin._id,
      targetType: "User",
      description: `Deleted admin ${admin.email}`,
    });

    return res.status(200).json({
      success: true,
      message: "Admin deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const resetAdminPassword = async (req, res) => {
  try {
    const { password } = req.body || {};

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const admin = await User.findOne({
      _id: req.params.id,
      role: "admin",
    }).select("+password");

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    admin.password = password;
    await admin.save();

    await logActivity({
      req,
      action: "Reset Password",
      module: "Admin Management",
      targetId: admin._id,
      targetType: "User",
      description: `Reset password for admin ${admin.email}`,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const listActivityLogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      adminId,
      module,
      action,
      dateFrom,
      dateTo,
    } = req.query;

    const query = {};

    if (adminId) query.performedBy = adminId;
    if (module) query.module = module;
    if (action) query.action = action;

    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    if (search) {
      query.$or = [
        { action: { $regex: search, $options: "i" } },
        { module: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { targetType: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [logs, total, admins] = await Promise.all([
      ActivityLog.find(query)
        .populate("performedBy", "fullName email role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      ActivityLog.countDocuments(query),
      User.find({ role: { $in: ["super_admin", "admin"] } })
        .select("fullName email role")
        .sort({ fullName: 1 }),
    ]);

    return res.status(200).json({
      success: true,
      logs,
      admins,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
