import { TPathError } from "../@types";
import { Response } from "express";
import { handleError } from "../errors/handleError";
import { CartErrors } from "../errors/cart.errors";

export class CartValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "clientId") {
      return handleError(CartErrors.invalidCartInfo("Cliente inválido"), res);
    }
    if (pathError === "appointmentId") {
      return handleError(
        CartErrors.invalidCartInfo("Agendamento inválido"),
        res
      );
    }
  }
}
