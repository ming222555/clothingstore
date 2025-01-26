import * as Db from "@/lib/db";

export type Cart = {
  id: string;
  lines: {
    product_id: string;
    qty: number;
    name: string;
    unit_price: number;
    img_src: string;
  }[];
  currency: string;
};

export const cartGet = async (cartId: string): Promise<Cart | null> => {
  // Retrieve cart from db with cartId

  if (!cartId) {
    return null;
  }

  if (typeof cartId !== "string") {
    return null;
  }

  const cart = await Db.cartGet(cartId);

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

export const cartAdd = async ({
  productId,
  cartId,
}: {
  productId: string;
  cartId: string;
}): Promise<Db.CartAddReturn> => {
  if (!productId || typeof productId !== "string") {
    return { error: "Invalid product ID", meta: null };
  }

  const ret = await Db.cartAdd({
    productId,
    cartId,
  });
  return ret;
};

export const cartUpdate = async ({
  qty,
  productId,
  cartId,
}: {
  qty: number;
  productId: string;
  cartId: string;
}): Promise<Db.CartAddReturn> => {
  if (!productId || typeof productId !== "string") {
    return { error: "Invalid product ID", meta: null };
  }

  const ret = await Db.cartUpdate({
    qty,
    productId,
    cartId,
  });
  return ret;
};
