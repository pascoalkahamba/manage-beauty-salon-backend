import express from "express";
import AcademicLevelController from "../controllers/academicLevel.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const academicLevelController = new AcademicLevelController();
const academicLevelRoutes = express.Router();

academicLevelRoutes.get(
  "/getAllAcademicLevels",
  academicLevelController.getAllAcademicLevels
);
academicLevelRoutes.use(authMiddleware);
academicLevelRoutes.post("/create", academicLevelController.addAcademicLevel);
academicLevelRoutes.post(
  "/updateAcademicLevel/:academicLevelId",
  academicLevelController.updateAcademicLevel
);
academicLevelRoutes.delete(
  "/deleteAcademicLevel/:academicLevelId",
  academicLevelController.deleteAcademicLevel
);

export { academicLevelRoutes };
