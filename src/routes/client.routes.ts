import express from "express";
import ClientController from "../controllers/client.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import upload from "../config/multerConfig";
import { uploadFileMiddleware } from "../middlewares/uploadFileMiddleware";

const clientController = new ClientController();
const clientRoutes = express.Router();

clientRoutes.post("/create", clientController.addClient);
clientRoutes.post("/login", clientController.login);
clientRoutes.post("/forgotPassword", clientController.forgotPassword);

clientRoutes.use(authMiddleware);

clientRoutes.get("/getOneClient/:clientId", clientController.getOneClient);
clientRoutes.post(
  "/updateInfoProfile/:clientId",
  upload.single("file"),
  uploadFileMiddleware,
  clientController.updateClient
);
clientRoutes.delete("/deleteClient/:clientId", clientController.deleteClient);

export { clientRoutes };
