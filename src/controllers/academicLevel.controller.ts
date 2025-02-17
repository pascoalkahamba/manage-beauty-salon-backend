import { Request, Response } from "express";
import AcademicLevelService from "../services/academicLevel.service";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { createAcademicLevelSchema } from "../schemas";
import { AcademicLevelValidator } from "../validators/academicLevel.validator";
import { AcademicLevelErrors } from "../errors/academicLevel.errors";
import { StatusCodes } from "http-status-codes";

const academicLevelService = new AcademicLevelService();
const academicLevelValidator = new AcademicLevelValidator();

export default class AcademicLevelController {
  async addAcademicLevel(req: Request, res: Response) {
    try {
      const { name, description } = createAcademicLevelSchema.parse(req.body);
      const academicLevel = await academicLevelService.addAcademicLevel({
        name,
        description,
      });
      if (!academicLevel) {
        throw AcademicLevelErrors.academicLevelAlreadyExists();
      }
      return res.status(StatusCodes.CREATED).json(academicLevel);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        academicLevelValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateAcademicLevel(req: Request, res: Response) {
    try {
      const academicLevelId = req.params.academicLevelId as unknown as number;
      const { name, description } = createAcademicLevelSchema.parse(req.body);
      const academicLevel = await academicLevelService.updateAcademicLevel({
        id: +academicLevelId,
        name,
        description,
      });
      if (!academicLevel) {
        throw AcademicLevelErrors.academicLevelNotFound();
      }

      if (academicLevel === "academicLevelAlreadyExist") {
        throw AcademicLevelErrors.academicLevelAlreadyExists();
      }
      return res.status(StatusCodes.OK).json(academicLevel);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        academicLevelValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllAcademicLevels(req: Request, res: Response) {
    try {
      const academicLevels = await academicLevelService.getAllAcademicLevels();
      return res.status(StatusCodes.OK).json(academicLevels);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        academicLevelValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteAcademicLevel(req: Request, res: Response) {
    try {
      const academicLevelId = req.params.academicLevelId as unknown as number;
      const academicLevel = await academicLevelService.deleteAcademicLevel(
        +academicLevelId
      );
      if (!academicLevel) {
        throw AcademicLevelErrors.academicLevelNotFound();
      }
      return res.status(StatusCodes.OK).json(academicLevel);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        academicLevelValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
