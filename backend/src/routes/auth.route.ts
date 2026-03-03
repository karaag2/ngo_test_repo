import { Router } from "express";
import {
  registerController,
  loginController,
  set2faController,
  check2FAController,
} from "@/controllers/auth.controller.route.js";
import authMiddleware from "@/middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/check-2fa", check2FAController);

router.use(authMiddleware);

router.post("/setup-2fa", set2faController);

export default router;
