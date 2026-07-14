import express from "express";
import { createInquiry, getAllInquiries, updateInquiryStatus  } from "../controllers/inquiryController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createInquiry);

router.get("/", protect, authorize("admin"), getAllInquiries);
router.patch("/:id/status", protect, authorize("admin"), updateInquiryStatus);
export default router;
