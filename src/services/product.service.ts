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
  async addProduct(productData: ProductModel) {
    const { categoryId, description, name, price } = productData;
    const productName = await prismaService.prisma.product.findFirst({
      where: { name },
    });
    if (productName) return;
    const product = await prismaService.prisma.product.create({
      data: {
        name,
        description,
        price,
        category: { connect: { id: categoryId } },
      },
      select: DEFAULT_SELECT,
    });

    const allStock = await prismaService.prisma.stock.findMany();
    await prismaService.prisma.stock.create({
      data: {
        product: { connect: { id: product.id } },
        quantity: allStock.reduce((acc, stock) => acc + stock.quantity, 0) + 1,
      },
    });
    return product;
  }
  async deleteProductById(productId: number) {
    const product = await prismaService.prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) return;

    const deleted = await prismaService.prisma.product.delete({
      where: { id: productId },
      select: DEFAULT_SELECT,
    });

    return deleted;
  }
  async updateProduct(id: number, productData: ProductModel) {
    const product = await prismaService.prisma.product.findFirst({
      where: { id },
    });
    if (!product) return;

    if (product.categoryId !== productData.categoryId) {
      await prismaService.prisma.product.update({
        where: { id: productData.categoryId },
        data: {
          categoryId: productData.categoryId,
        },
      });
    }
    const updated = await prismaService.prisma.product.update({
      where: { id },
      data: productData,
      select: DEFAULT_SELECT,
    });

    return updated;
  }
  async getProductById(productId: number) {
    const product = await prismaService.prisma.product.findFirst({
      where: { id: productId },
      select: DEFAULT_SELECT,
    });

    if (!product) return;

    return product;
  }
  async getAllProducts() {
    const products = await prismaService.prisma.product.findMany({
      select: DEFAULT_SELECT,
    });

    return products;
  }
}
