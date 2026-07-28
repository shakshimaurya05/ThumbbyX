import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { applyToCareer, getPublicCareer, getPublicCareers } from "../controllers/careerController.js";

const router = express.Router();
router.get("/", getPublicCareers);
router.get("/:id", getPublicCareer);
router.post("/apply", upload.single("resume"), applyToCareer);
export default router;
