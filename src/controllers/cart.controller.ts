import { Request, Response } from "express";
import CartService from "../services/cart.service";
import { CartValidator } from "../validators/cart.validator";
import { handleError } from "../errors/handleError";
import { CartErrors } from "../errors/cart.errors";
import { fromError } from "zod-validation-error";
import { TPathError } from "../@types";
import { BaseError } from "../errors/baseError";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";

const cartService = new CartService();
const cartValidator = new CartValidator();

export default class CartController {
  async addCart(req: Request, res: Response) {
    try {
      const { clientId, appointmentId } = req.body;
      const cart = await cartService.addCart({
        clientId: +clientId,
        appointmentId: +appointmentId,
      });
      return res.status(StatusCodes.CREATED).json(cart);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        cartValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getAllCarts(req: Request, res: Response) {
    try {
      const carts = await cartService.getAllCarts();
      return res.status(StatusCodes.OK).json(carts);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        cartValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getOneCart(req: Request, res: Response) {
    try {
      const { cartId } = req.params as unknown as { cartId: number };
      const cart = await cartService.getCartById(+cartId);
      if (!cart) throw CartErrors.cartNotFound();
      return res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        cartValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async deleteCart(req: Request, res: Response) {
    try {
      const { cartId } = req.params as unknown as { cartId: number };
      const cart = await cartService.deleteCart(+cartId);
      if (!cart) throw CartErrors.cartNotFound();
      return res.status(StatusCodes.ACCEPTED).json(cart);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        cartValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const { cartId } = req.params as unknown as { cartId: number };
      const { clientId, appointmentId } = req.body;
      const cart = await cartService.updateCart({
        id: +cartId,
        clientId: +clientId,
        appointmentId: +appointmentId,
      });
      if (!cart) throw CartErrors.cartNotFound();
      return res.status(StatusCodes.ACCEPTED).json(cart);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        cartValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }

  async getCartByClientId(req: Request, res: Response) {
    try {
      const { clientId } = req.params as unknown as { clientId: number };
      const cart = await cartService.getCartByClientId(+clientId);
      if (!cart) throw CartErrors.cartNotFound();
      return res.status(StatusCodes.OK).json(cart);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromError(error);
        const { details } = validationError;
        const pathError = details[0].path[0] as TPathError;
        cartValidator.validator(pathError, res);
      } else {
        return handleError(error as BaseError, res);
      }
    }
  }
}
