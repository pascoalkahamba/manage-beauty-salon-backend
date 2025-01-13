import { Product, ShoppingCart, User } from "@prisma/client";

export type DataBaseExtraValues = "createdAt" | "updatedAt" | "id";

export type UserModel = Omit<User, DataBaseExtraValues>;
export type ProductModel = Omit<Product, DataBaseExtraValues>;
export type ShoppingCartModel = Omit<ShoppingCart, DataBaseExtraValues>;
