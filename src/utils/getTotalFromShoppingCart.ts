import { Decimal } from "@prisma/client/runtime/library";

interface SimpleShoppingCart {
  createdAt: Date;
  id: number;
  amount: number;
  product: {
    id: number;
    name: string;
    price: Decimal;
  };
}

export function getTotalFromShoppingCart(data: SimpleShoppingCart[]) {
  return data.reduce((prev, curr) => {
    return curr.amount * Number(curr.product.price) + prev;
  }, 0);
}
