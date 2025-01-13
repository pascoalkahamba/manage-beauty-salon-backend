import { ProductModel } from "../@types";
import { prismaService } from "./prisma.service";

const DEFAULT_SELECT = {
  id: true,
  name: true,
  price: true,
  stock: true,
  createdAt: true,
};

export class ProductService {
  static pageMaxItems = 10;
  async add(productData: ProductModel) {
    const product = await prismaService.prisma.product.create({
      data: productData,
      select: DEFAULT_SELECT,
    });

    return product;
  }
  async removeById(id: number) {
    try {
      const deleted = await prismaService.prisma.product.delete({
        where: { id },
        select: DEFAULT_SELECT,
      });

      return deleted;
    } catch (e) {
      return false;
    }
  }
  async update(id: number, productData: ProductModel) {
    const updated = await prismaService.prisma.product.update({
      where: { id },
      data: productData,
      select: DEFAULT_SELECT,
    });

    console.log(updated);

    return updated;
  }
  async getById(id: number) {
    const product = await prismaService.prisma.product.findFirst({
      where: { id },
      select: DEFAULT_SELECT,
    });

    return product;
  }
  async getProductsList() {
    let products = await prismaService.prisma.product.findMany({
      //   skip: page * ProductService.pageMaxItems,
      //   take: ProductService.pageMaxItems,
      select: DEFAULT_SELECT,
    });

    return products;
  }
}
