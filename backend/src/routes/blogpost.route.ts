import { Router } from "express";
import {
  addPostController,
  deletePostController,
  getAllPostController,
  getPostController,
  getPostBySlugController,
  updatePostController,
} from "@/controllers/blogpost.controller.js";
import authMiddleware from "@/middlewares/auth.middleware.js";
import requireRole from "@/middlewares/role.middleware.js";

const router = Router();

// ─── Routes publiques ────────────────────────────────
router.get("/allPosts", getAllPostController);
router.get("/slug/:slug", getPostBySlugController);

// ─── Routes protégées (admin connecté) ───────────────
router.use(authMiddleware);

router.get("/post/:PostId", getPostController);
router.post("/post", addPostController);
router.patch("/post/:PostId", updatePostController);

// ─── Suppression : SUPER_ADMIN ou auteur ─────────────
router.delete("/post/:PostId", deletePostController);

export default router;
