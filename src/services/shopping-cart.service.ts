import { ShoppingCart } from "@prisma/client";
import { ShoppingCartModel } from "../@types";
import { BaseError } from "../errors/baseError";
import { prismaService } from "./prisma.service";
import { ProductErrors } from "../errors/product.errors";

export class ShoppingCartService {
  private async pickProductFromTheStock(shoppingCart: ShoppingCartModel) {
    const product = await prismaService.prisma.product.findFirst({
      where: { id: shoppingCart.product_id },
    });

    if (!product) {
      throw ProductErrors.productNotFound();
    }

    const currentStock = product.stock;
    const nextStock = currentStock - shoppingCart.amount;

    if (nextStock < 0) {
      throw new BaseError(
        `Não há itens suficientes no stock. Encontrado: ${currentStock}`,
        401
      );
    }

    await prismaService.prisma.product.update({
      where: { id: product.id },
      data: {
        stock: nextStock,
      },
    });
  }

  async addProduct(shoppingCart: ShoppingCartModel) {
    await this.pickProductFromTheStock(shoppingCart);

    let res = await prismaService.prisma.shoppingCart.create({
      data: shoppingCart,
    });

    return res;
  }

  private async removeProductsFromShoppingCart(
    shoppingCarts: ShoppingCart[],
    forceDelete: boolean = false
  ) {
    for (let shoppingCart of shoppingCarts) {
      let currentProduct = await prismaService.prisma.product.findFirst({
        where: { id: shoppingCart.product_id },
      });

      if (!currentProduct) {
        throw ProductErrors.productNotFound();
      }

      const nextStock = currentProduct.stock + shoppingCart.amount;

      await prismaService.prisma.product.update({
        where: { id: shoppingCart.product_id },
        data: {
          stock: nextStock,
        },
      });

      if (forceDelete) {
        await prismaService.prisma.shoppingCart.delete({
          where: { id: shoppingCart.id },
        });
      }
    }
  }

  async removeProduct(userId: number, productId: number) {
    try {
      let shoppingCarts = await prismaService.prisma.shoppingCart.findMany({
        where: { user_id: userId, product_id: productId },
      });

      await this.removeProductsFromShoppingCart(shoppingCarts, true);

      return Boolean(shoppingCarts.length);
    } catch (e) {
      return false;
    }
  }
  async removeAllProducts(userId: number) {
    try {
      let shoppingCarts = await prismaService.prisma.shoppingCart.findMany({
        where: { user_id: userId },
      });

      await this.removeProductsFromShoppingCart(shoppingCarts, true);

      return Boolean(shoppingCarts.length);
    } catch (e) {
      return false;
    }
  }
  async updateAmount(id: number, amount: number) {
    let shoppingCart = await prismaService.prisma.shoppingCart.findFirst({
      where: { id },
    });

    if (!shoppingCart) {
      throw ProductErrors.productNotFound();
    }

    const previousAmount = shoppingCart?.amount || 0;

    if (amount === 0) {
      await prismaService.prisma.shoppingCart.delete({
        where: { id },
      });

      return shoppingCart;
    }

    // quero 3 - no carrinho
    // tinha 2 - antes
    if (amount > previousAmount) {
      // reduzir no carrrinho se existe uma quantidade suficiente
      this.pickProductFromTheStock({
        ...shoppingCart,
        amount: amount - previousAmount,
      });
    }

    // quero 2 - no carrinho
    // tinha 3 - antes
    if (amount < previousAmount) {
      this.removeProductsFromShoppingCart([
        {
          ...shoppingCart,
          // add 1 no stock
          amount: previousAmount - amount,
        },
      ]);
    }

    await prismaService.prisma.shoppingCart.update({
      where: { id: shoppingCart.id },
      data: { amount },
    });

    return shoppingCart;
  }
  async getShoppingCartByUser(page: number, user_id: number) {
    let shoppingCarts = await prismaService.prisma.shoppingCart.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        amount: true,
        createdAt: true,
        product: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    return shoppingCarts;
  }

  async buyProducts(userId: number) {
    let res = await prismaService.prisma.shoppingCart.deleteMany({
      where: {
        user: {
          id: userId,
        },
      },
    });

    return res.count;
  }
}
