import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class UserErrors {
  static invalidName() {
    return new BaseError("Nome invalido", StatusCodes.BAD_REQUEST);
  }

  static invalidEmail() {}
  static tooShortPassword() {
    return new BaseError(
      "Senha deve ter mais de 6 caracteres",
      StatusCodes.LENGTH_REQUIRED
    );
  }
  static userEmailExists() {
    return new BaseError(
      "Já existe um usuário com este email",
      StatusCodes.CONFLICT
    );
  }
  static userNotFound() {
    return new BaseError("Usuário não encontrado", StatusCodes.NOT_FOUND);
  }
  static userOrPasswordWrong() {
    return new BaseError(
      "Email ou senha incorretos",
      StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE
    );
  }
}
