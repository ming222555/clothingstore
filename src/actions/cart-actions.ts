"use server";

import { cookies } from "next/headers";

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

export const getCheckoutFromCookiesAction =
  async (): Promise<Commerce.Checkout | null> => {
    const cartCookieJson = await getCartCookieJson();
    if (!cartCookieJson) {
      return null;
    }

    const checkout = await Commerce.checkoutGet(cartCookieJson.id);
    return checkout;
  };

export const clearYnsCartCookieAction = async () => {
  (await cookies()).delete("yns_cart");
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

export const cartUpdateAction = async (
  qty: number,
  productId: string
): Promise<{ error: string }> => {
  if (!productId || typeof productId !== "string") {
    return { error: "Invalid product ID" };
  }

  const cart = await getCartFromCookiesAction();

  if (!cart) {
    return { error: "Cart not found" };
  }

  const updatedCart = await Commerce.cartUpdate({
    qty,
    productId,
    cartId: cart.id,
  });

  if (updatedCart.error) {
    return {
      error: updatedCart.error,
    };
  }

  await new Promise((resolv) => setTimeout(resolv, 2000));

  const rc = await setCartCookieJson({
    id: updatedCart.meta!.id,
    linesCount: updatedCart.meta!.linesCount,
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

export const checkoutUpdateOrInsertShippingRateAction = async (
  shippingRateId: string
): Promise<{ error: string }> => {
  if (!shippingRateId || typeof shippingRateId !== "string") {
    return { error: "Invalid Shipping Rate ID" };
  }

  const cart = await getCartFromCookiesAction();

  if (!cart) {
    return { error: "Cart not found" };
  }

  const updatedOrInserted = await Commerce.checkoutUpdateOrInsertShippingRateId(
    {
      shippingRateId,
      cartId: cart.id,
    }
  );

  if (updatedOrInserted.error) {
    return {
      error: updatedOrInserted.error,
    };
  }

  await new Promise((resolv) => setTimeout(resolv, 2000));

  return {
    error: "",
  };
};

export const checkoutUpdateOrInsertAction = async (
  formValues: Commerce.Checkout
): Promise<{
  errors: {
    field: string;
    errormsg: string;
  }[];
}> => {
  const cart = await getCartFromCookiesAction();

  if (!cart) {
    return {
      errors: [
        {
          field: "checkout",
          errormsg: "Cart not found",
        },
      ],
    };
  }

  const updatedOrInserted = await Commerce.checkoutUpdateOrInsert({
    formValues,
    cartId: cart.id,
  });

  if (updatedOrInserted.errors.length) {
    return updatedOrInserted;
  }

  await new Promise((resolv) => setTimeout(resolv, 2000));

  return {
    errors: [],
  };
};

export const getShippingRatesAction = async () => {
  const shippingRates = await Commerce.getShippingRates();
  return shippingRates;
};

export const validateCheckoutAction = async (formValues: Commerce.Checkout) => {
  const rc = await Commerce.validateCheckout(formValues);
  return rc;
};
