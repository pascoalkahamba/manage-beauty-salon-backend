import express from "express";
import CategoryController from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const categoryController = new CategoryController();
const categoryRoutes = express.Router();

categoryRoutes.use(authMiddleware);
categoryRoutes.post(
  "/create",
  upload.single("file"),
  uploadFileMiddleware,
  categoryController.addCategory
);
categoryRoutes.get(
  "/getOneCategory/:categoryId",
  categoryController.getOneCategory
);
categoryRoutes.get("/getAllCategories", categoryController.getAllCategories);
categoryRoutes.post("/update/:categoryId", categoryController.updateCategory);
categoryRoutes.delete("/delete/:categoryId", categoryController.deleteCategory);

export { categoryRoutes };
