import { StatusCodes } from "http-status-codes";
import { BaseError } from "../errors/baseError";
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
    if (pathError === "hour") {
      return handleError(
        AppointmentErrors.invalidAppointmentInfo("Horário inválido."),
        res
      );
    }
  }
}
