import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class CodeValidationToEmplyeeError {
  static codeDoesntExists() {
    return new BaseError("Código não encontrado", StatusCodes.NOT_FOUND);
  }
  static codeAlreadyExists() {
    return new BaseError("Código já existe", StatusCodes.CONFLICT);
  }
  static invalidCodeInfo(messaeg: string) {
    return new BaseError(messaeg, StatusCodes.BAD_REQUEST);
  }
}
