import { Response } from "express";
import { TPathError } from "../@types";
import EmployeeError from "../errors/employee.error";
import { handleError } from "../errors/handleError";

export default class EmployeeValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "username") {
      return handleError(
        EmployeeError.invalidInfo("Nome do funcionário invalido."),
        res
      );
    }
    if (pathError === "password") {
      return handleError(
        EmployeeError.invalidInfo("Senha do funcionário invalido."),
        res
      );
    }
    if (pathError === "email") {
      return handleError(
        EmployeeError.invalidInfo("Email do funcionário invalido."),
        res
      );
    }
    if (pathError === "contact") {
      return handleError(
        EmployeeError.invalidInfo("Contacto do funcionário invalido."),
        res
      );
    }

    if (pathError === "emailAlreadyExist") {
      return handleError(
        EmployeeError.invalidInfo("Email já cadastrado."),
        res
      );
    }
  }
}
