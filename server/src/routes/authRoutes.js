import express from "express";
import {
  registerCustomer, registerContractor, login, getCurrentUser, logout, refreshAccessToken, forgotPassword,resetPassword, setupSuperAdmin
} from "../controllers/authController.js";
const router = express.Router();
import {
  protect,
} from "../middleware/authMiddleware.js";

router.post(
  "/register/customer",
  registerCustomer
);

router.post(
  "/register/contractor",
  registerContractor
);

router.post(
  "/login",
  login
);
router.get(
  "/me",
  protect,
  getCurrentUser
);
router.post(
  "/logout",
  logout
);
router.post(
  "/refresh-token",
  refreshAccessToken
);
router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPassword
);
router.post(
  "/setup-super-admin",
  setupSuperAdmin
);
export default router;
