import { Request, Response } from "express";
import { handleError } from "../errors/handleError";
import { BaseError } from "../errors/baseError";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { ShoppingCartModel, UserModel } from "../@types";
import { ProductService } from "../services/product.service";
import { prismaService } from "../services/prisma.service";
import { getTotalFromShoppingCart } from "../utils/getTotalFromShoppingCart";
import { StatusCodes } from "http-status-codes";

const shoppingCartService = new ShoppingCartService();
const productService = new ProductService();

export class ShoppingCartController {
  async addProduct(req: Request, res: Response) {
    try {
      const shoppingCart = req.body as ShoppingCartModel;
      shoppingCart.user_id = req.id;

      // validate before (if amount cannot be zero)

      let exists = await prismaService.prisma.shoppingCart.findFirst({
        where: {
          user: {
            id: shoppingCart.user_id,
          },
          product: {
            id: shoppingCart.product_id,
          },
        },
      });

      console.log("exists", exists);

      if (exists) {
        throw new BaseError(
          "Este produto já foi adicionado ao carrinho",
          StatusCodes.CONFLICT
        );
      }

      let shoppingCartAdded = await shoppingCartService.addProduct(
        shoppingCart
      );

      res.send(shoppingCartAdded);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async removeProduct(req: Request, res: Response) {
    try {
      const productId = req.params.productId as unknown as number;
      const userId = req.id;

      let removed = await shoppingCartService.removeProduct(productId, userId);

      if (!removed) {
        // throw an error. Shopping Cart does not exist.
      }

      res.send(removed);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async removeAllProducts(req: Request, res: Response) {
    try {
      const userId = req.id;

      let removed = await shoppingCartService.removeAllProducts(userId);

      if (!removed) {
        // throw an error. Shopping Cart does not exist.
        throw new BaseError(
          "Houve um erro ao eliminar os produtos",
          StatusCodes.NOT_FOUND
        );
      }

      res.send(removed);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const shoppingCartData = req.body as Pick<ShoppingCartModel, "amount">;

      // validate before updating

      const updated = await shoppingCartService.updateAmount(
        +id,
        shoppingCartData.amount
      );

      res.send(updated);
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const page = req.params.page;
      const user_id = req.id;

      let shoppingCartList = await shoppingCartService.getShoppingCartByUser(
        +page,
        user_id
      );

      const user = await prismaService.prisma.user.findFirst({
        where: { id: user_id },
        select: {
          name: true,
          email: true,
          id: true,
        },
      });

      res.send({
        user,
        items: shoppingCartList,
        products: shoppingCartList.length + " produto(s) no carrinho",
        total:
          getTotalFromShoppingCart(shoppingCartList).toLocaleString("pt-BR"),
      });
    } catch (e) {
      handleError(e as BaseError, req, res);
    }
  }
  async buyProductsOnShoppingCart(req: Request, res: Response) {
    const user_id = req.id;

    let amount = await shoppingCartService.buyProducts(user_id);

    if (amount > 0) {
      return res.send({
        message: `Você acabou de comprar ${amount} produto(s) a partir do seu carrinho.`,
      });
    }

    return res.send({
      message: "O seu carrinho está vazio ainda.",
    });
  }
}
