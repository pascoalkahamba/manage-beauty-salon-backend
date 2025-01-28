import express from "express";
import AppointmentController from "../controllers/appointment.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const appointmentController = new AppointmentController();
const appointmentRoutes = express.Router();

appointmentRoutes.use(authMiddleware);
appointmentRoutes.get(
  "/getAllAppointments",
  appointmentController.getAllAppointments
);
appointmentRoutes.post("/create", appointmentController.addAppointment);
appointmentRoutes.get(
  "/getOneAppointment/:appointmentId",
  appointmentController.getOneAppointment
);
appointmentRoutes.post(
  "/update/:appointmentId",
  appointmentController.updateAppointment
);
appointmentRoutes.delete(
  "/delete/:appointmentId",
  appointmentController.deleteAppointment
);

export { appointmentRoutes };
