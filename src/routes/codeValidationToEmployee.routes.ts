import express from "express";
import CodeValidationToEmployeeController from "../controllers/codeValidationToEmployee.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const codeValidationToEmployeeController =
  new CodeValidationToEmployeeController();
const codeValidationToEmployeeRoutes = express.Router();

codeValidationToEmployeeRoutes.use(authMiddleware);
codeValidationToEmployeeRoutes.post(
  "/create",
  codeValidationToEmployeeController.createCodeValidationToEmployee
);
codeValidationToEmployeeRoutes.get(
  "/getOneCodeValidationToEmployee",
  codeValidationToEmployeeController.getOneCodeValidationToEmployee
);
codeValidationToEmployeeRoutes.get(
  "/getAllCodeValidationToEmployees",
  codeValidationToEmployeeController.getAllCodeValidationToEmployee
);
codeValidationToEmployeeRoutes.post(
  "/update",
  codeValidationToEmployeeController.updateCodeValidationToEmployee
);
codeValidationToEmployeeRoutes.delete(
  "/delete",
  codeValidationToEmployeeController.deleteCodeValidationToEmployee
);

export { codeValidationToEmployeeRoutes };
