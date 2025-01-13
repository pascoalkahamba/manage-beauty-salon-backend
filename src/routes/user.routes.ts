import express from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth.middleware";

const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/", userController.add);
userRouter.post("/login", userController.login);

userRouter.delete("/:id", authMiddleware, userController.remove);

export { userRouter };
