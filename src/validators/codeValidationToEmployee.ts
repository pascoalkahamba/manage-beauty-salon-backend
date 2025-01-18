import { TPathError } from "../@types";
import { Response } from "express";
import { handleError } from "../errors/handleError";
import { CodeValidationToEmplyeeError } from "../errors/codeValidationToEmployee";

export default class CodeValidationToEmployeeValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "characters") {
      return handleError(
        CodeValidationToEmplyeeError.invalidCodeInfo(
          "Caracteres do codigo inválido, deve conter 8 digitos um numero e uma letra e um caracter especial (@$!%*#?&)."
        ),
        res
      );
    }

    if (pathError === "description") {
      return handleError(
        CodeValidationToEmplyeeError.invalidCodeInfo(
          "Descrição do codigo inválida"
        ),
        res
      );
    }
  }
}
