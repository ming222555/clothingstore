"use server";

import { getCartCookieJson } from "@/lib/cart";
import * as Commerce from "@/lib/commerce-kit";
import { setCartCookieJson } from "@/lib/cart";

export const getCartFromCookiesAction =
  async (): Promise<Commerce.Cart | null> => {
    const cartCookieJson = await getCartCookieJson();
    if (!cartCookieJson) {
      return null;
    }

    const cart = await Commerce.cartGet(cartCookieJson.id);
    return cart;
  };

export const addToCartAction = async (
  productId: string
): Promise<{ error: string }> => {
  if (!productId || typeof productId !== "string") {
    return { error: "Invalid product ID" };
  }

  const cart = await getCartFromCookiesAction();

  const createdOrUpdatedCart = await Commerce.cartAdd({
    productId,
    cartId: `${cart ? cart.id : ""}`,
  });

  if (createdOrUpdatedCart.error) {
    return {
      error: createdOrUpdatedCart.error,
    };
  }

  await new Promise((resolv) => setTimeout(resolv, 2000));

  const rc = await setCartCookieJson({
    id: createdOrUpdatedCart.meta!.id,
    linesCount: createdOrUpdatedCart.meta!.linesCount,
  });

  if (rc) {
    return {
      error: "",
    };
  }

  return {
    error: "Failed to set cart cookie",
  };
};
