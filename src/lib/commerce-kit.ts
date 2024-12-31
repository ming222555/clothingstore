import * as Db from "@/lib/db";

export type Cart = {
  id: string;
  lines: {
    product_id: string;
    qty: number;
  }[];
  currency: string;
};

export type CartDetailed = Omit<Cart, "lines"> & {
  lines: {
    product_id: string;
    qty: number;
    name: string;
    unit_price: number;
    imgSrc: string;
  }[];
};

export const cartGet = async (cartId: string): Promise<Cart | null> => {
  // Retrieve cart from db with cartId.
  // Return cart or else null if cart not found.

  if (!cartId) {
    return null;
  }

  if (typeof cartId !== "string") {
    return null;
  }

  const cart = await Db.getCart(cartId);

  return cart;
};

export const calculateCartTotalNetWithoutShipping = async (
  cart: Cart
): Promise<number> => {
  if (!cart) {
    return 0;
  }

  const total = await Db.cartTotalNetWithoutShipping(cart);

  return total;
};

export const calculateCartAddOptimisticCartTotalNetWithoutShipping = async (
  cart: Cart | null,
  product_id: string
): Promise<number> => {
  const total = await Db.cartAddOptimisticTotalNetWithoutShipping(
    cart,
    product_id
  );

  return total;
};

export const cartAddOptimistic = async ({
  add,
  cart,
}: {
  add: string;
  cart: Cart | null;
}): Promise<CartDetailed | null> => {
  return await Db.getPreviewCartAddOptimistic({ add, cart });
};
