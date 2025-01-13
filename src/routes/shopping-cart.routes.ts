import express from "express";
import { ShoppingCartController } from "../controllers/shoppingCartController";
import { authMiddleware } from "../middlewares/auth.middleware";

const shoppingCartRouter = express.Router();

const shoppingCartController = new ShoppingCartController();

shoppingCartRouter.use(authMiddleware);

shoppingCartRouter.get("/", shoppingCartController.getAll);
shoppingCartRouter.post("/", shoppingCartController.addProduct);
shoppingCartRouter.delete("/", shoppingCartController.removeAllProducts);
shoppingCartRouter.put("/:id", shoppingCartController.update);
shoppingCartRouter.delete("/:productId", shoppingCartController.removeProduct);
shoppingCartRouter.post(
  "/buy",
  shoppingCartController.buyProductsOnShoppingCart
);

export { shoppingCartRouter };
