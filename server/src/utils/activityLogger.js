import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async ({
  req,
  action,
  module,
  targetId = null,
  targetType = "",
  description = "",
}) => {
  try {
    await ActivityLog.create({
      performedBy: req?.user?._id || null,
      role: req?.user?.role || "",
      action,
      module,
      targetId,
      targetType,
      description,
      ipAddress:
        req?.headers?.["x-forwarded-for"] ||
        req?.socket?.remoteAddress ||
        req?.ip ||
        "",
    });
  } catch (error) {
    console.log("Activity log failed:", error.message);
  }
};
