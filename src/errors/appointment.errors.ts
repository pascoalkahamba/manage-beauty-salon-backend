import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class AppointmentErrors {
  static appointmentNotFound() {
    return new BaseError("Agendamento não encontrado ", StatusCodes.NOT_FOUND);
  }

  static appointmentAlreadyExists() {
    return new BaseError("Agendamento já cadastrado", StatusCodes.CONFLICT);
  }
  static appointmentNotCreated() {
    return new BaseError("Agendamento não criado", StatusCodes.BAD_REQUEST);
  }
  static appointmentNotUpdated() {
    return new BaseError("Agendamento não atualizado", StatusCodes.BAD_REQUEST);
  }
  static appointmentNotDeleted() {
    return new BaseError("Agendamento não deletado", StatusCodes.BAD_REQUEST);
  }

  static invalidAppointmentInfo(message: string) {
    return new BaseError(message, StatusCodes.BAD_REQUEST);
  }
}
