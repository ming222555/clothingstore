"use server";

import { getCartCookieJson } from "@/lib/cart";
import * as Commerce from "@/lib/commerce-kit";
import type { Cart } from "@/lib/commerce-kit";

export const getCartFromCookiesAction = async (): Promise<Cart | null> => {
  const cartCookieJson = await getCartCookieJson();
  if (!cartCookieJson) {
    return null;
  }

  const cart = await Commerce.cartGet(cartCookieJson.id);
  return cart;
};
