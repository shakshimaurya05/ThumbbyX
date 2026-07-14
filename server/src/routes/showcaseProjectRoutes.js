import express from "express";

import {
  createShowcaseProject,
  deleteShowcaseProject,
  getShowcaseProjectById,
  getShowcaseProjects,
  updateShowcaseProject,
} from "../controllers/showcaseProjectController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getShowcaseProjects);
router.get("/:id", getShowcaseProjectById);
router.post("/", protect, authorize("admin"), upload.single("imageFile"), createShowcaseProject);
router.put("/:id", protect, authorize("admin"), upload.single("imageFile"), updateShowcaseProject);
router.delete("/:id", protect, authorize("admin"), deleteShowcaseProject);

export default router;
