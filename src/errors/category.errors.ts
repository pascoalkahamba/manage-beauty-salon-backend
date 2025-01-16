import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class CategoryError {
  static categoryNotFound() {
    return new BaseError("Categoria não encontrada", StatusCodes.NOT_FOUND);
  }
  static categoryAlreadyExists() {
    return new BaseError("Categoria já existe", StatusCodes.CONFLICT);
  }

  static invalidCategoryInfo(messaeg: string) {
    return new BaseError(messaeg, StatusCodes.BAD_REQUEST);
  }
}
