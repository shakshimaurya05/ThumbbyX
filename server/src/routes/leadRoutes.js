import express from "express";
import { createLead, createCostEstimatorLead } from "../controllers/leadController.js";

const router = express.Router();

router.post("/", createLead);

// Cost estimator form submissions
router.post("/cost-estimator", createCostEstimatorLead);

export default router;
