import { Response } from "express";
import { TPathError } from "../@types";
import ClientError from "../errors/employee.error";
import { handleError } from "../errors/handleError";

export default class ClientValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "username") {
      return handleError(
        ClientError.invalidInfo("Nome do cliente invalido."),
        res
      );
    }
    if (pathError === "password") {
      return handleError(
        ClientError.invalidInfo("Senha do cliente invalido."),
        res
      );
    }
    if (pathError === "email") {
      return handleError(
        ClientError.invalidInfo("Email do cliente invalido."),
        res
      );
    }
    if (pathError === "cellphone") {
      return handleError(
        ClientError.invalidInfo("Contacto do cliente invalido."),
        res
      );
    }
  }
}
