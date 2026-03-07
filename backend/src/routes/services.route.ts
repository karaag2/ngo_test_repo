import { Router } from "express";
import authMiddleware from "@/middlewares/auth.middleware.js";
import {
  addServiceController,
  deleteServiceController,
  getAllServicesController,
  getServiceController,
  updateServiceController,
} from "@/controllers/services.controller.js";

const router = Router();

router.get("/allServices", getAllServicesController);

router.use(authMiddleware);

router.get("/service/:ServiceId", getServiceController);

router.post("/service", addServiceController);

router.patch("/service/:ServiceId", updateServiceController);

router.delete("/service/:ServiceId", deleteServiceController);

export default router;
