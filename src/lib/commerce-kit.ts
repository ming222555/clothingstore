import {
  getCart,
  cartTotalNetWithoutShipping,
  cartOptimisticTotalNetWithoutShipping,
  getPreviewCartAddOptimistic,
} from "@/lib/db";

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

  const cart = await getCart(cartId);

  return cart;
};

export const calculateCartTotalNetWithoutShipping = async (
  cart: Cart
): Promise<number> => {
  if (!cart) {
    return 0;
  }

  const total = await cartTotalNetWithoutShipping(cart);

  return total;
};

export const calculateOptimisticCartTotalNetWithoutShipping = async (
  cart: Cart,
  product_id: string
): Promise<number> => {
  const total = await cartOptimisticTotalNetWithoutShipping(cart, product_id);

  return total;
};

export const cartAddOptimistic = async ({
  add,
  cart,
}: {
  add: string;
  cart: Cart | null;
}): Promise<CartDetailed | null> => {
  return await getPreviewCartAddOptimistic({ add, cart });
};
