import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ProductService } from "../services/product.service";
import { ProductModel } from "../@types";
import { ProductValidator } from "../validators/product.validator";
import { ProductErrors } from "../errors/product.errors";

const productService = new ProductService();

const productValidator = new ProductValidator();

export class ProductController {
  async add(req: Request, res: Response) {
    try {
      const product = req.body as ProductModel;

      await productValidator.validate(product);

      let productAdded = await productService.add(product);

      return res.send(productAdded);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async remove(req: Request, res: Response) {
    try {
      const id = req.params.id as unknown as number;

      let removed = await productService.removeById(id);

      if (!removed) {
        throw ProductErrors.productNotFound();
      }

      return res.send(removed);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const productData = req.body as ProductModel;

      await productValidator.validate(productData, +id);

      console.log("product", productData);

      const updated = await productService.update(+id, productData);

      return res.send(updated);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getProductsList(req: Request, res: Response) {
    try {
      let productList = await productService.getProductsList();

      return res.send(productList);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const productId = req.params.id;

      let product = await productService.getById(+productId);

      res.send(product);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
}
