import { AddCartI, UpdateCartI } from "../interfaces";
import { prismaService } from "./prisma.service";

export default class CartService {
  async addCart(cartInfo: AddCartI) {
    const { clientId, appointmentId } = cartInfo;

    const existingCart = await prismaService.prisma.cart.findFirst({
      where: {
        clientId,
      },
      select: {
        appointment: true,
        id: true,
      },
    });

    const appointment = await prismaService.prisma.appointment.findFirst({
      where: {
        id: appointmentId,
      },
      select: {
        clientId: true,
        id: true,
      },
    });

    const clientAppointments = existingCart?.appointment.some(
      (appointment) => appointment.id === appointmentId
    );
    if (clientAppointments) return "Appointment already in cart";

    if (!appointment || appointment.clientId !== clientId) return;

    if (existingCart) {
      // User already has a cart, just connect the new appointment
      return await prismaService.prisma.cart.update({
        where: {
          id: existingCart.id,
        },
        data: {
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
    }

    // Create new cart for first-time users
    return await prismaService.prisma.cart.create({
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

    const appointment = await prismaService.prisma.appointment.findFirst({
      where: {
        id: appointmentId,
      },
      select: {
        clientId: true,
        id: true,
      },
    });
    if (!appointment) return;
    if (appointment.clientId !== clientId) return "You can't update this cart";

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
}
