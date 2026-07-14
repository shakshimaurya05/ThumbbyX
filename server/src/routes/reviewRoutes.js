import express from "express";
import {
  getReviews,
  getVideoReviews,
  createVideoReview,
  deleteVideoReview,
  getProjectReview,
  createProjectReview,
  deleteProjectReview, 
  getCustomerPendingReviews,
  getContractorReviewsMe,
  getContractorReviewsById,
  createAppReview, getAppReview,
  deleteAppReview
} from "../controllers/reviewController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getReviews);
router.get("/videos", getVideoReviews);
router.get("/project/:projectId", protect, getProjectReview);
router.post("/project/:projectId", protect, authorize("customer", "contractor"), createProjectReview);

router.get("/app/:projectId", protect, getAppReview);
router.post("/app/:projectId", protect, authorize("customer", "contractor"), createAppReview);
router.get("/customer/pending", protect, authorize("customer"), getCustomerPendingReviews);
router.get("/contractor/me", protect, authorize("contractor"), getContractorReviewsMe);
router.get("/contractor/:id", getContractorReviewsById);
router.post("/admin/videos", protect, authorize("admin"), createVideoReview);
router.delete("/admin/videos/:id", protect, authorize("admin"), deleteVideoReview);
router.delete("/admin/project-reviews/:id", protect, authorize("admin"), deleteProjectReview);
router.delete("/admin/app-reviews/:id", protect, authorize("admin"), deleteAppReview);
export default router;
