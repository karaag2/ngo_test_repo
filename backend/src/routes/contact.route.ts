import { Router } from "express";
import {
  addContactController,
  getAllContactsController,
  toggleReadStatusController,
  deleteContactController,
} from "@/controllers/contact.controller.js";
import authMiddleware from "@/middlewares/auth.middleware.js";

const router = Router();

// Route publique pour envoyer un message
router.post("/", addContactController);

// Routes protégées pour l'administration
router.use(authMiddleware);
router.get("/", getAllContactsController);
router.patch("/:id/read", toggleReadStatusController);
router.delete("/:id", deleteContactController);

export default router;
