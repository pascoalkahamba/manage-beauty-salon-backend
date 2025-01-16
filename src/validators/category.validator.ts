import { TPathError } from "../@types";
import { CategoryError } from "../errors/category.errors";
import { handleError } from "../errors/handleError";
import { Response } from "express";

export class CategoryValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "name") {
      return handleError(
        CategoryError.invalidCategoryInfo("Nome inválido"),
        res
      );
    }
    if (pathError === "description") {
      return handleError(
        CategoryError.invalidCategoryInfo("Descrição inválida"),
        res
      );
    }
    if (pathError === "servicesIds") {
      return handleError(
        CategoryError.invalidCategoryInfo("Serviços inválidos"),
        res
      );
    }
  }
}
