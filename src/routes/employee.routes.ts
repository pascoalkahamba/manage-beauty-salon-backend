import express from "express";
import EmployeeController from "../controllers/employee.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const employeeController = new EmployeeController();
const employeeRoutes = express.Router();

employeeRoutes.post("/create", employeeController.addEmployee);
employeeRoutes.post("/login", employeeController.login);
employeeRoutes.post("/forgotPassword", employeeController.forgotPassword);

employeeRoutes.use(authMiddleware);

employeeRoutes.get(
  "/getOneEmployee/:employeeId",
  employeeController.getOneEmployee
);
employeeRoutes.post(
  "/updateInfoProfile/:employeeId",
  upload.single("file"),
  uploadFileMiddleware,
  employeeController.updateEmployee
);
employeeRoutes.delete(
  "/deleteEmployee/:employeeId",
  employeeController.deleteEmployee
);

export { employeeRoutes };
