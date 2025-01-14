import { Response } from "express";
import { TPathError } from "../@types";
import ProductErrors from "../errors/product.errors";
import { handleError } from "../errors/handleError";

export default class ProductValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "name") {
      return handleError(ProductErrors.invalidName(), res);
    }
    if (pathError === "description") {
      return handleError(
        ProductErrors.invalidInfo("descrição do produto invalido."),
        res
      );
    }
    if (pathError === "categoryId") {
      return handleError(
        ProductErrors.invalidInfo("Categoria do produto invalido."),
        res
      );
    }
    if (pathError === "price") {
      return handleError(
        ProductErrors.invalidInfo("Preço do produto invalido."),
        res
      );
    }
  }
}
