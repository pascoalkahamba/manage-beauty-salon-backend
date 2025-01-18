import { CreateCategoryI, UpdateCategoryI } from "../interfaces";
import { prismaService } from "./prisma.service";

export default class CategoryService {
  async getAllCategories() {
    const categories = await prismaService.prisma.category.findMany();

    return categories;
  }

  async getCategoryById(categoryId: number) {
    const category = await prismaService.prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!category) return;
    return category;
  }

  async addCategory(categoryInfo: CreateCategoryI) {
    const { name, description, services } = categoryInfo;
    const category = await prismaService.prisma.category.findFirst({
      where: {
        name,
      },
    });
    if (category) return;

    const newCategory = await prismaService.prisma.category.create({
      data: {
        name,
        description,
        services: {
          create: services.map((service) => ({
            name: service.name,
            price: service.price,
            duration: service.duration,
            description: service.description,
            picture: {
              create: {
                url: service.photo.url ? service.photo.url : "",
                name: service.photo.name ? service.photo.name : "",
              },
            },
          })),
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        services: true,
      },
    });
    return newCategory;
  }

  async updateCategory(categoryInfo: UpdateCategoryI) {
    const { name, description, servicesIds, id } = categoryInfo;
    const category = await prismaService.prisma.category.findFirst({
      where: {
        id,
      },
    });
    if (!category) return;
    const services = await prismaService.prisma.service.findMany({
      where: {
        id: {
          in: servicesIds,
        },
      },
    });
    if (services.length === 0) return "No services found";

    const updatedCategory = await prismaService.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        services: {
          set: services.map((service) => ({ id: service.id })),
        },
      },
    });
    return updatedCategory;
  }

  async deleteCategory(categoryId: number) {
    const allCategories = await this.getAllCategories();

    if (allCategories.length === 1) return "Can't delete the last category";
    const category = await prismaService.prisma.category.findFirst({
      where: { id: categoryId },
    });
    if (!category) return;
    await prismaService.prisma.category.delete({
      where: { id: categoryId },
    });
    return category;
  }
}
