import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class AuthError {
  static noTokenProvided() {
    return new BaseError("Token não informado", StatusCodes.UNAUTHORIZED);
  }

  static invalidToken() {
    return new BaseError("Token invalido", StatusCodes.UNAUTHORIZED);
  }
}
