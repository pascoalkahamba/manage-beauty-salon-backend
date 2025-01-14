import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export default class ProductErrors {
  static invalidName() {
    return new BaseError("Nome do produto invalido", StatusCodes.BAD_REQUEST);
  }
  static invalidInfo(message: string) {
    return new BaseError(message, StatusCodes.BAD_REQUEST);
  }
  static productAlreadyExist() {
    return new BaseError(
      "Já existe um produto com este nome",
      StatusCodes.CONFLICT
    );
  }
  static productNotFound() {
    return new BaseError("Produto não encontrado", StatusCodes.NOT_FOUND);
  }
}
