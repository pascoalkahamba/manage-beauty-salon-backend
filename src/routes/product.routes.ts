import express from "express";
import ProductController from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const productController = new ProductController();
const productRoutes = express.Router();

productRoutes.use(authMiddleware);
productRoutes.post("/create", productController.addProduct);
productRoutes.delete("/delete/:productId", productController.deleteProduct);
productRoutes.get(
  "/getOneProduct/:productId",
  productController.getProductById
);
productRoutes.get("/getAllProducts", productController.getAllProducts);
productRoutes.post(
  "/updateProduct/:productId",
  productController.updateProduct
);

export { productRoutes };
