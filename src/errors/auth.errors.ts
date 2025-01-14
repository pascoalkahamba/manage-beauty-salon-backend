import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class AuthError {
  static typeOfAuthInvalid() {
    return new BaseError(
      "Tipo de autenticação não permitido",
      StatusCodes.UNAUTHORIZED
    );
  }

  static noTokenProvided() {
    return new BaseError("Token não fornecido", StatusCodes.UNAUTHORIZED);
  }

  static invalidToken() {
    return new BaseError("Token não autorizado", StatusCodes.UNAUTHORIZED);
  }
}
