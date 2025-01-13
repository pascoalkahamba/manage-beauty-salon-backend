import { BaseError } from "./baseError";
import { StatusCodes } from "http-status-codes";

export class ProductErrors {
  static invalidName() {
    return new BaseError("Nome do produto invalido", StatusCodes.BAD_REQUEST);
  }
  static productExists() {
    return new BaseError(
      "Já existe um produto com este nome",
      StatusCodes.CONFLICT
    );
  }
  static productNotFound() {
    return new BaseError("Produto não encontrado", StatusCodes.NOT_FOUND);
  }
}
