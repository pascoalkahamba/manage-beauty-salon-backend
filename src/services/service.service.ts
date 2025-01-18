import { ServiceModel } from "../@types";
import { CreateServiceI, UpdateServiceI } from "../interfaces";
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

  async addService(serviceInfo: CreateServiceI) {
    const { name, price, duration, categoryId, description, photo } =
      serviceInfo;
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
    if (!category) return "No category found";

    const newService = await prismaService.prisma.service.create({
      data: {
        name,
        price,
        duration,
        description,
        picture: {
          create: {
            url: photo.url ? photo.url : "",
            name: photo.name ? photo.name : "",
          },
        },
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    return newService;
  }

  async updateService(serviceInfo: UpdateServiceI) {
    const { name, price, duration, categoryId, description, id, photo } =
      serviceInfo;
    const service = await prismaService.prisma.service.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        picture: true,
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
    const category = await prismaService.prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });
    if (!category) return "No category found";

    const updatedService = await prismaService.prisma.service.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        duration,
        picture: {
          update: {
            url: photo.url ? photo.url : service.picture?.url,
            name: photo.name ? photo.name : service.picture?.name,
          },
        },
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
    const allServices = await this.getAllServices();

    if (allServices.length === 1) return "Can't delete the last service";
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
