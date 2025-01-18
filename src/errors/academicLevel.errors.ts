import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class AcademicLevelErrors {
  static academicLevelNotFound() {
    return new BaseError(
      "Nível acadêmico não encontrado",
      StatusCodes.NOT_FOUND
    );
  }
  static academicLevelAlreadyExists() {
    return new BaseError("Nível acadêmico já existe", StatusCodes.CONFLICT);
  }
  static invalidAcademicLevelInfo(messaeg: string) {
    return new BaseError(messaeg, StatusCodes.BAD_REQUEST);
  }
}
