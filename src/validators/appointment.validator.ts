import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { Response } from "express";
import { AppointmentErrors } from "../errors/appointment.errors";

export class AppointmentValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "date") {
      return handleError(
        AppointmentErrors.invalidAppointmentInfo("Data inválida."),
        res
      );
    }
    if (pathError === "reason") {
      return handleError(
        AppointmentErrors.invalidAppointmentInfo(
          "Motivo tem que ter no minimo 10 caracteres."
        ),
        res
      );
    }
    if (pathError === "status") {
      return handleError(
        AppointmentErrors.invalidAppointmentInfo("Status inválido."),
        res
      );
    }
    if (pathError === "hour") {
      return handleError(
        AppointmentErrors.invalidAppointmentInfo("Horário inválido."),
        res
      );
    }
  }
}
