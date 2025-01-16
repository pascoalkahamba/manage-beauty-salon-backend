import { CategoryModel } from "../@types";
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
    const { name, description, servicesIds } = categoryInfo;
    const category = await prismaService.prisma.category.findFirst({
      where: {
        name,
      },
    });
    if (category) return;

    const services = await prismaService.prisma.service.findMany({
      where: {
        id: {
          in: servicesIds,
        },
      },
    });
    if (services.length === 0) return;

    const newCategory = await prismaService.prisma.category.create({
      data: {
        name,
        description,
        services: {
          connect: servicesIds.map((id) => ({ id })),
        },
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
    if (services.length === 0) return;

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
