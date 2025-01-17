import { Request, Response } from "express";
import CodeValidationToEmployeeService from "../services/codeValidationToEmployee.service";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { TPathError } from "../@types";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { StatusCodes } from "http-status-codes";
import { codeValidationSchema } from "../schemas";
import CodeValidationToEmployeeValidator from "../validators/codeValidationToEmployee";
import { CodeValidationToEmplyeeError } from "../errors/codeValidationToEmployee";

const codeValidationToEmployeeService = new CodeValidationToEmployeeService();
const codeValidationToEmployeeValidator =
  new CodeValidationToEmployeeValidator();

export default class CodeValidationToEmployeeController {
  async createCodeValidationToEmployee(req: Request, res: Response) {
    try {
      const { characters, description } = codeValidationSchema.parse(req.body);
      const codeValidationToEmployee =
        await codeValidationToEmployeeService.addCode({
          characters,
          description,
        });
      if (!codeValidationToEmployee) {
        throw CodeValidationToEmplyeeError.codeAlreadyExists();
      }
      return res.status(StatusCodes.CREATED).json(codeValidationToEmployee);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        codeValidationToEmployeeValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
