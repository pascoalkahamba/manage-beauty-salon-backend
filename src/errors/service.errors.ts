import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class ServiceError {
  static serviceNotFound() {
    return new BaseError("Serviço não encontrado", StatusCodes.NOT_FOUND);
  }
  static serviceAlreadyExists() {
    return new BaseError("Serviço já existe", StatusCodes.CONFLICT);
  }

  static invalidServiceInfo(messaeg: string) {
    return new BaseError(messaeg, StatusCodes.BAD_REQUEST);
  }
}
