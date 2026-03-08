import { Router } from "express";
import { uploadImageController } from "@/controllers/upload.controller.js";
import authMiddleware from "@/middlewares/auth.middleware.js";
import { upload } from "@/middlewares/upload.middleware.js";

const router = Router();

// Route protégée pour l'upload d'images
router.post(
  "/image",
  authMiddleware,
  upload.single("image"),
  uploadImageController,
);

export default router;
