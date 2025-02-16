import { Request, Response } from "express";
import CategoryService from "../services/category.service";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { CategoryValidator } from "../validators/category.validator";
import { TPathError } from "../@types";
import { createCategorySchema, updateCategorySchema } from "../schemas";
import { CategoryError } from "../errors/category.errors";
import { StatusCodes } from "http-status-codes";
import { ServiceError } from "../errors/service.errors";

const categoryService = new CategoryService();
const categoryValidator = new CategoryValidator();
export default class CategoryController {
  async addCategory(req: Request, res: Response) {
    try {
      const { description, name, services } = createCategorySchema.parse(
        req.body
      );

      const category = await categoryService.addCategory({
        description,
        name,
        services: services.map((service) => {
          return {
            name: service.name,
            description: service.description,
            price: service.price,
            duration: service.duration,
            photo: {
              name: req.fileName ?? "",
              url: req.fileUrl ?? "",
            },
          };
        }),
      });

      if (!category) {
        throw CategoryError.categoryAlreadyExists();
      }

      if (category === "serviceAlreadyExist") {
        throw ServiceError.serviceAlreadyExists();
      }

      return res.status(StatusCodes.CREATED).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        categoryValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await categoryService.getAllCategories();
      return res.status(StatusCodes.OK).json(categories);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        categoryValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getOneCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId as unknown as number;
      const category = await categoryService.getCategoryById(+categoryId);
      if (!category) {
        throw CategoryError.categoryNotFound();
      }
      return res.status(StatusCodes.OK).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        categoryValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId as unknown as number;
      const { name, description } = updateCategorySchema.parse(req.body);
      const category = await categoryService.updateCategory({
        id: +categoryId,
        name,
        description,
      });
      if (!category) {
        throw CategoryError.categoryNotFound();
      }

      if (category === "categoryAlreadyExists") {
        throw CategoryError.categoryAlreadyExists();
      }
      return res.status(StatusCodes.OK).json(category);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        categoryValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId as unknown as number;
      const categoryDeleted = await categoryService.deleteCategory(+categoryId);

      if (categoryDeleted === "Can't delete the last category") {
        throw CategoryError.invalidCategoryInfo(
          "Não podess eliminar a última categoria"
        );
      }

      if (!categoryDeleted) {
        throw CategoryError.categoryNotFound();
      }
      return res.status(StatusCodes.OK).json(categoryDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        categoryValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
