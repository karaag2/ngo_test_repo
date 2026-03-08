import { Router } from "express";
import {
  registerController,
  loginController,
  set2faController,
  check2FAController,
  logOutController,
  getProfileController,
  updateProfileController,
  changePasswordController,
  confirmSetup2FAController,
} from "@/controllers/auth.controller.js";
import authMiddleware from "@/middlewares/auth.middleware.js";
import requireRole from "@/middlewares/role.middleware.js";

const router = Router();

// ─── Routes publiques ────────────────────────────────
router.post("/login", loginController);
router.post("/check-2fa", check2FAController);
router.post("/logout", logOutController);

// ─── Routes protégées (authentification requise) ─────
router.use(authMiddleware);

router.post("/setup-2fa", set2faController);
router.post("/confirm-setup-2fa", confirmSetup2FAController);
router.get("/me", getProfileController);
router.patch("/me", updateProfileController);
router.post("/change-password", changePasswordController);

// ─── Routes SUPER_ADMIN uniquement ───────────────────
router.post("/register", requireRole("SUPER_ADMIN"), registerController);

export default router;
