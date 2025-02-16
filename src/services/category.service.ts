import { CreateCategoryI, UpdateCategoryI } from "../interfaces";
import { prismaService } from "./prisma.service";

export default class CategoryService {
  async getAllCategories() {
    const categories = await prismaService.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        services: true,
      },
    });

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

    const serviceNames = services.map((service) => service.name);
    const serviceAlreadyExist = await prismaService.prisma.service.findFirst({
      where: {
        name: {
          in: serviceNames,
        },
      },
    });

    if (serviceAlreadyExist) return "serviceAlreadyExist";

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
    const { name, description, id } = categoryInfo;
    const category = await prismaService.prisma.category.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
    if (!category) return;

    const categoryExit = await prismaService.prisma.category.findFirst({
      where: {
        name,
      },
    });

    if (categoryExit && categoryExit.id !== id) return "categoryAlreadyExists";

    const updatedCategory = await prismaService.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
        description,
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
