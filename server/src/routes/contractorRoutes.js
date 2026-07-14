import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import {
  getContractorProfile,
  updateContractorProfile,
  uploadDocuments,
  submitApplication, 
  getApprovedContractors,   getApprovedContractorById,
  getMyLeads
 } from "../controllers/contractorController.js";

import {
  protect,
  authorize,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/profile",
  protect,
  authorize("contractor"),
  getContractorProfile
);

router.put(
  "/profile",
  protect,
  authorize("contractor"),
  updateContractorProfile
);
router.put(
  "/submit-application",
  protect,
  submitApplication
);
router.put(
  "/upload-documents",
  protect,
  authorize("contractor"),
  upload.fields([
    {
      name: "profilePhoto",
      maxCount: 1,
    },
    {
      name: "aadhaarDocument",
      maxCount: 1,
    },
    {
      name: "panDocument",
      maxCount: 1,
    },
    {
      name: "gstDocument",
      maxCount: 1,
    },
    {
      name: "udyamDocument",
      maxCount: 1,
    },
    {
      name:
        "policeVerificationDocument",
      maxCount: 1,
    },
  ]),
  uploadDocuments
);
router.get(
  "/public",
  getApprovedContractors
);
router.get(
  "/public/:id",
  getApprovedContractorById
);
router.get(
  "/my-leads",
  protect,
  authorize("contractor"),
  getMyLeads
);
export default router;