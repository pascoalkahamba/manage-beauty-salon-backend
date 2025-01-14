import express from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.post("/", productController.add);
productRouter.get("/list", productController.getProductsList);
productRouter.get("/:id", productController.getById);
productRouter.delete("/:id", productController.remove);
productRouter.put("/:id", productController.update);

export { productRouter };
