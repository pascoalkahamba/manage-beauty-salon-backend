import { Request, Response } from "express";
import ServiceService from "../services/service.service";
import ServiceValidator from "../validators/service.validator";
import { handleError } from "../errors/handleError";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { BaseError } from "../errors/baseError";
import { TPathError } from "../@types";
import { createServiceSchema } from "../schemas";
import { ServiceError } from "../errors/service.errors";
import { StatusCodes } from "http-status-codes";

const serviceService = new ServiceService();
const serviceValidator = new ServiceValidator();

export default class ServiceController {
  async addService(req: Request, res: Response) {
    try {
      const { name, description, price, categoryId, duration } =
        createServiceSchema.parse(req.body);
      const service = await serviceService.addService({
        name,
        description,
        duration,
        price,
        categoryId,
      });

      if (!service) {
        throw ServiceError.serviceAlreadyExists();
      }
      return res.status(StatusCodes.CREATED).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        serviceValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
