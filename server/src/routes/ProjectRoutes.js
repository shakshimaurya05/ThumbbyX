import express from "express";

import {
  addProjectUpdate,
  getProjectUpdates, getMyProjects, getProjectById,
   uploadProjectPhoto, getCustomerProjects, submitMilestoneUtr, confirmMilestonePayment,payContractor,
} from "../controllers/projectController.js";

import {
  protect, authorize
} from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router =
  express.Router();

router.post(
  "/:id/update",
  protect,
  addProjectUpdate
);

router.get(
  "/:id/updates",
  protect,
  getProjectUpdates
);
router.get(
  "/my-projects",
  protect,
  getMyProjects
);
router.get(
  "/:id",
  protect,
  getProjectById
);
router.post(
  "/:id/upload-photo",
  protect,
  upload.single("photo"),
  uploadProjectPhoto
);
router.get(
  "/customer/my-projects",
  protect,
  authorize("customer"),
  getCustomerProjects
);

router.post("/:id/submit-utr", protect, submitMilestoneUtr);
router.post("/:id/confirm-milestone", protect, confirmMilestonePayment);
router.post("/:id/pay-contractor", protect, payContractor);

export default router;