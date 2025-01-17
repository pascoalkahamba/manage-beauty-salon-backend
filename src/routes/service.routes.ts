import express from "express";
import ServiceController from "../controllers/service.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const serviceController = new ServiceController();
const serviceRoutes = express.Router();

serviceRoutes.use(authMiddleware);
serviceRoutes.post(
  "/create",
  upload.single("file"),
  uploadFileMiddleware,
  serviceController.addService
);
serviceRoutes.get("/getOneService/:serviceId", serviceController.getOneService);
serviceRoutes.get("/getAllServices", serviceController.getAllServices);
serviceRoutes.post(
  "/update/:serviceId",
  upload.single("file"),
  uploadFileMiddleware,
  serviceController.updateService
);
serviceRoutes.delete("/delete/:serviceId", serviceController.deleteService);

export { serviceRoutes };
