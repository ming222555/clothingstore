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

  return {
    id: cartId,
    lines: [
      { product_id: "gloves-with-holes", qty: 0 },
      { product_id: "brewster-mug", qty: 1 },
    ],
    currency: "USD",
  };
};

export const calculateCartTotalNetWithoutShipping = async (
  cart: Cart
): Promise<number> => {
  if (!cart) {
    return 0;
  }

  // To compute cart total, do a join on tables cart, cart_line, and product
  return 888.99;
};
