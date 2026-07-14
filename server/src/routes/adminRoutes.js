import express from "express";

import {
  getAllContractors,
  getContractorById,
  approveContractor,
  rejectContractor,
  getAllLeads,assignContractor,convertLeadToProject, getAllProjects, getProjectById, markProjectAsCompleted
} from "../controllers/adminController.js";
import {
  createAdminUser,
  deleteAdminUser,
  disableAdminUser,
  enableAdminUser,
  listActivityLogs,
  listAdmins,
  resetAdminPassword,
  updateAdminUser,
} from "../controllers/adminManagementController.js";

import {
  protect,
  authorize,
  authorizeSuperAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/contractors",
  protect,
  authorize("admin"),
  getAllContractors
);

router.get(
  "/contractors/:id",
  protect,
  authorize("admin"),
  getContractorById
);

router.patch(
  "/approve-contractor/:id",
  protect,
  authorize("admin"),
  approveContractor
);

router.patch(
  "/reject-contractor/:id",
  protect,
  authorize("admin"),
  rejectContractor
);
router.get(
  "/leads",
  protect,
  authorize("admin"),
  getAllLeads
);
router.patch(
  "/assign-contractor/:id",
  protect,
  authorize("admin"),
  assignContractor
);
router.patch(
  "/convert-lead/:id",
  protect,
  authorize("admin"),
  convertLeadToProject
);
router.get(
  "/projects",
  protect,
  authorize("admin"),
  getAllProjects
);
router.get(
  "/projects/:id",
  protect,
  authorize("admin"),
  getProjectById
);
router.patch("/projects/:id/complete", protect, authorize("admin"), markProjectAsCompleted);

router.get(
  "/admins",
  protect,
  authorizeSuperAdmin,
  listAdmins
);

router.post(
  "/admins",
  protect,
  authorizeSuperAdmin,
  createAdminUser
);

router.put(
  "/admins/:id",
  protect,
  authorizeSuperAdmin,
  updateAdminUser
);

router.patch(
  "/admins/:id/disable",
  protect,
  authorizeSuperAdmin,
  disableAdminUser
);

router.patch(
  "/admins/:id/enable",
  protect,
  authorizeSuperAdmin,
  enableAdminUser
);

router.patch(
  "/admins/:id/reset-password",
  protect,
  authorizeSuperAdmin,
  resetAdminPassword
);

router.delete(
  "/admins/:id",
  protect,
  authorizeSuperAdmin,
  deleteAdminUser
);

router.get(
  "/activity-logs",
  protect,
  authorizeSuperAdmin,
  listActivityLogs
);
export default router;
