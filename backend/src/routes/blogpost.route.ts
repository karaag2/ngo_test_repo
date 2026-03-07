import { Router } from "express";
import {
    addPostController,
  deletePostController,
  getAllPostController,
  getPostController,
  updatePostController,
} from "@/controllers/blogpost.controller.js";
import authMiddleware from "@/middlewares/auth.middleware.js";

const router = Router();

router.get("/allPosts", getAllPostController);

router.use(authMiddleware)

router.get("/post/:PostId", getPostController);

router.post("/post", addPostController);

router.patch("/post", updatePostController);

router.delete("/post/:PostId", deletePostController);


export default router;
