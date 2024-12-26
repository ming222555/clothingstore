import { getCart, cartTotalNetWithoutShipping } from "@/lib/db";

export interface Cart {
  id: string;
  lines: {
    product_id: string;
    qty: number;
  }[];
  currency: string;
}

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

  const cartTotalWithoutShipping = await cartTotalNetWithoutShipping(cart);

  return cartTotalWithoutShipping;
};
