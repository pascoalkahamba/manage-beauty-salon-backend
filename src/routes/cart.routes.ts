import express from "express";
import CartController from "../controllers/cart.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const cartController = new CartController();
const cartRoutes = express.Router();

cartRoutes.use(authMiddleware);
cartRoutes.get("/getAllCarts", cartController.getAllCarts);
cartRoutes.post("/create", cartController.addCart);
cartRoutes.post("/update/:cartId", cartController.updateCart);
cartRoutes.delete("/delete/:cartId", cartController.deleteCart);
cartRoutes.get("/getOneCart/:cartId", cartController.getOneCart);
cartRoutes.get(
  "/getCartByClientId/:clientId",
  cartController.getCartByClientId
);

export { cartRoutes };
