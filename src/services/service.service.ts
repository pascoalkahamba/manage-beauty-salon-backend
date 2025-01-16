import { ServiceModel } from "../@types";
import { prismaService } from "./prisma.service";

export default class ServiceService {
  async getAllServices() {
    const services = await prismaService.prisma.service.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        duration: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return services;
  }

  async getServiceById(serviceId: number) {
    const service = await prismaService.prisma.service.findFirst({
      where: { id: serviceId },
      select: {
        id: true,
        name: true,
        price: true,
        duration: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!service) return;
    return service;
  }

  async addService(serviceInfo: ServiceModel) {
    const { name, price, duration, categoryId, description } = serviceInfo;
    const service = await prismaService.prisma.service.findFirst({
      where: {
        name,
      },
    });
    if (service) return;

    const category = await prismaService.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
    if (!category) return;

    const newService = await prismaService.prisma.service.create({
      data: {
        name,
        price,
        duration,
        description,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    return newService;
  }

  async updateService(serviceId: number, serviceInfo: ServiceModel) {
    const { name, price, duration, categoryId, description } = serviceInfo;
    const service = await prismaService.prisma.service.findFirst({
      where: {
        id: serviceId,
      },
    });
    if (!service) return;
    const category = await prismaService.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
    if (!category) return;

    const updatedService = await prismaService.prisma.service.update({
      where: {
        id: serviceId,
      },
      data: {
        name,
        price,
        duration,
        description,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    return updatedService;
  }

  async deleteService(serviceId: number) {
    const service = await prismaService.prisma.service.findFirst({
      where: {
        id: serviceId,
      },
    });
    if (!service) return;
    const deletedService = await prismaService.prisma.service.delete({
      where: {
        id: serviceId,
      },
    });
    return deletedService;
  }
}
