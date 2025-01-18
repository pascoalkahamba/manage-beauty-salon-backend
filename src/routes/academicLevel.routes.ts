import express from "express";
import AcademicLevelController from "../controllers/academicLevel.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const academicLevelController = new AcademicLevelController();
const academicLevelRoutes = express.Router();

academicLevelRoutes.use(authMiddleware);
academicLevelRoutes.post("/create", academicLevelController.addAcademicLevel);
academicLevelRoutes.delete(
  "/delete/:academicLevelId",
  academicLevelController.delelteAcademicLevel
);
academicLevelRoutes.get(
  "/getAllAcademicLevels",
  academicLevelController.getAllAcademicLevels
);
academicLevelRoutes.post(
  "/updateAcademicLevel/:academicLevelId",
  academicLevelController.updateAcademicLevel
);

export { academicLevelRoutes };
