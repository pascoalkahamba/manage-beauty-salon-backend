import { ProductModel, UserModel } from "../@types";
import { ProductErrors } from "../errors/product.errors";
import { prismaService } from "../services/prisma.service";

export class ProductValidator {
  async validate(product: ProductModel, id?: number) {
    if (!product.name && !id) throw ProductErrors.invalidName();

    if (product.name) {
      const productExists = await prismaService.prisma.product.findFirst({
        where: { name: product.name },
      });

      if (id && productExists?.id === id) {
        return;
      }

      if (productExists) throw ProductErrors.productExists();
    }
  }
}
