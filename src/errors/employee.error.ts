import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export default class EmployeeError {
  static invalidInfo(errorMessage: string) {
    return new BaseError(errorMessage, StatusCodes.BAD_REQUEST);
  }

  static emailAlreadyExist() {
    return new BaseError("Email já cadastrado.", StatusCodes.CONFLICT);
  }

  static emailOrPasswordWrong() {
    return new BaseError("Email ou senha errada.", StatusCodes.BAD_REQUEST);
  }

  static emailNotFound() {
    return new BaseError("Email não foi encontrado.", StatusCodes.NOT_FOUND);
  }
  static adminNotFound() {
    return new BaseError(
      "Funcionario não foi encontrado.",
      StatusCodes.NOT_FOUND
    );
  }
  static sameInformation() {
    return new BaseError(
      "Email vou contacto são semelhantes.",
      StatusCodes.CONFLICT
    );
  }
}
