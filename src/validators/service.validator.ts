import { TPathError } from "../@types";
import { Response } from "express";
import { handleError } from "../errors/handleError";
import { ServiceError } from "../errors/service.errors";

export default class ServiceValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "name") {
      return handleError(ServiceError.invalidServiceInfo("Nome inválido"), res);
    }
    if (pathError === "description") {
      return handleError(
        ServiceError.invalidServiceInfo("Descrição inválida"),
        res
      );
    }
    if (pathError === "price") {
      return handleError(
        ServiceError.invalidServiceInfo("Preço inválido"),
        res
      );
    }
    if (pathError === "categoriesIds") {
      return handleError(
        ServiceError.invalidServiceInfo("Categorias inválidas"),
        res
      );
    }
  }
}
