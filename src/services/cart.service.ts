import { CartModel } from "../@types";
import { AddCartI, UpdateCartI } from "../interfaces";
import { prismaService } from "./prisma.service";

export default class CartService {
  async addCart(cartInfo: AddCartI) {
    const { clientId, appointmentId } = cartInfo;
    const newCart = await prismaService.prisma.cart.create({
      data: {
        client: {
          connect: {
            id: clientId,
          },
        },
        appointment: {
          connect: {
            id: appointmentId,
          },
        },
      },
      select: {
        clientId: true,
        appointment: true,
      },
    });
    return newCart;
  }

  async getCartByClientId(clientId: number) {
    const cart = await prismaService.prisma.cart.findFirst({
      where: {
        clientId,
      },
      select: {
        clientId: true,
        appointment: true,
      },
    });
    if (!cart) return;
    return cart;
  }

  async deleteCart(cartId: number) {
    const cart = await prismaService.prisma.cart.findFirst({
      where: {
        id: cartId,
      },
    });
    if (!cart) return;
    await prismaService.prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
    return cart;
  }

  async getAllCarts() {
    const carts = await prismaService.prisma.cart.findMany({
      select: {
        clientId: true,
        appointment: true,
      },
    });
    return carts;
  }

  async getCartById(cartId: number) {
    const cart = await prismaService.prisma.cart.findFirst({
      where: {
        id: cartId,
      },
      select: {
        clientId: true,
        appointment: true,
      },
    });
    if (!cart) return;
    return cart;
  }

  async updateCart(cartInfo: UpdateCartI) {
    const { clientId, appointmentId, id } = cartInfo;
    const cart = await prismaService.prisma.cart.findFirst({
      where: {
        id,
      },
    });
    if (!cart) return;
    const updatedCart = await prismaService.prisma.cart.update({
      where: {
        id,
      },
      data: {
        client: {
          connect: {
            id: clientId,
          },
        },
        appointment: {
          connect: {
            id: appointmentId,
          },
        },
      },
    });
    return updatedCart;
  }

  async deleteAppointmentFromCart(cartId: number) {
    const cart = await prismaService.prisma.cart.findFirst({
      where: {
        id: cartId,
      },
    });
    if (!cart) return;
    await prismaService.prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
    return cart;
  }
}
