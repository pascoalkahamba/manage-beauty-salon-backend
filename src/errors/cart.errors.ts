import { StatusCodes } from "http-status-codes";
import { BaseError } from "./baseError";

export class CartErrors {
  static cartNotFound() {
    return new BaseError("Carrinho não encontrado", StatusCodes.NOT_FOUND);
  }
  static cartNotCreated() {
    return new BaseError("Carrinho não criado", StatusCodes.BAD_REQUEST);
  }
  static cartNotUpdated() {
    return new BaseError("Carrinho não atualizado", StatusCodes.BAD_REQUEST);
  }
  static cartNotDeleted() {
    return new BaseError("Carrinho não deletado", StatusCodes.BAD_REQUEST);
  }
  static invalidCartInfo(message: string) {
    return new BaseError(message, StatusCodes.BAD_REQUEST);
  }
}
