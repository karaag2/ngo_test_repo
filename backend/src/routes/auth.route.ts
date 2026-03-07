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
} from "@/controllers/auth.controller.js";
import authMiddleware from "@/middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/check-2fa", check2FAController);

router.use(authMiddleware);

router.post("/setup-2fa", set2faController);

router.post("/logout", logOutController);

router.get("/me", getProfileController);

router.patch("/me", updateProfileController);

router.post("/change-password", changePasswordController);

export default router;
