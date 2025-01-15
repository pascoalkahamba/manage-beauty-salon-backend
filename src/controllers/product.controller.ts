import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ProductService } from "../services/product.service";
import { ProductModel, TPathError } from "../@types";
import ProductValidator from "../validators/product.validator";
import ProductErrors from "../errors/product.errors";
import { ZodError } from "zod";
import { fromError } from "zod-validation-error";
import { productSchema } from "../schemas";
import { StatusCodes } from "http-status-codes";

const productService = new ProductService();
const productValidator = new ProductValidator();

export default class ProductController {
  async addProduct(req: Request, res: Response) {
    try {
      const { name, description, categoryId, price } = productSchema.parse(
        req.body
      );

      const product = await productService.addProduct({
        name,
        description,
        categoryId,
        price,
      });

      if (!product) {
        throw ProductErrors.productAlreadyExist();
      }

      return res.status(StatusCodes.CREATED).json(product);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        productValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = req.params.productId as unknown as number;
      const productDeleted = await productService.deleteProductById(+productId);
      if (!productDeleted) {
        throw ProductErrors.productNotFound();
      }
      return res.status(StatusCodes.OK).json(productDeleted);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        productValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.productId as unknown as number;
      const { name, description, categoryId, price } = productSchema.parse(
        req.body
      );
      const product = await productService.updateProduct(+productId, {
        name,
        description,
        categoryId,
        price,
      });
      if (!product) {
        throw ProductErrors.productNotFound();
      }
      return res.status(StatusCodes.OK).json(product);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        productValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();
      return res.status(StatusCodes.OK).json(products);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        productValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.productId as unknown as number;
      const product = await productService.getProductById(+productId);
      if (!product) {
        throw ProductErrors.productNotFound();
      }
      return res.status(StatusCodes.OK).json(product);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        productValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
