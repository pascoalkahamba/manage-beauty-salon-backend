import { Response } from "express";
import { TPathError } from "../@types";
import { handleError } from "../errors/handleError";
import { AcademicLevelErrors } from "../errors/academicLevel.errors";

export class AcademicLevelValidator {
  validator(pathError: TPathError, res: Response) {
    if (pathError === "name") {
      return handleError(
        AcademicLevelErrors.invalidAcademicLevelInfo(
          "Nome do nível acadêmico inválido."
        ),
        res
      );
    }
    if (pathError === "description") {
      return handleError(
        AcademicLevelErrors.invalidAcademicLevelInfo(
          "Descrição do nível acadêmico inválida."
        ),
        res
      );
    }
  }
}
